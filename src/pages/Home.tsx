import React, {
  useState,
  useEffect,
  ChangeEvent,
  useContext,
  Dispatch,
  SetStateAction,
  useRef,
} from "react";
import Layout from "../components/Layout";
import Movie from "../components/Movie";
import { RootObject } from "../interface/ResponseProps";
import { getPopularMovie, getMoviesDiscover } from "../Api/api";
import LanguageContext from "../context/LanguageContext";
import RegionContext from "../context/RegionContext";
import PageContext from "../context/PageContext";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import {
  Button,
  Box,
  Grid,
  TextField,
  Pagination,
  FormControl,
  InputLabel,
  MenuItem,
  Backdrop,
  CircularProgress,
  Hidden,
  AccordionSummary,
  AccordionDetails,
  Accordion,
  Typography
} from "@mui/material";

import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import SortSearch from "../components/SortSearch";
import Genres from "../components/Genres";
import { PropsDiscover } from "../interface/RequestDiscover";

interface Props {}

function Home({}: Props) {
  const { setIsLanguageIn, isLanguageIn } = useContext(LanguageContext);
  const { isRegionIn, setIsRegionIn } = useContext(RegionContext);
  const { isPageIn, setIsPageIn } = useContext(PageContext);
  const [movies, setMovies] = useState<RootObject["results"]>([]);
  const [page, setPage] = useState(0);
  const [totalPages, setTotalPages] = useState<number>(0);
  const [loading, setLoading] = useState<boolean>(false);
  const [sortAction, setSortAction] = useState<string>("");
  const [isClickProps, setIsClickProps] = useState<boolean>(false);
  const [isSearchButton, setIsSearchButton] = useState<boolean>(false);
  const [searchText, setSearchText] = useState<string>("");
  const [isEnterSearch, setIsEnterSearch] = useState<boolean>(false);
  const [handleCallApi, setHandleCallApi] = useState({
    main: true,
    sortCall: false,
  });
  //const valueRef = useRef<HTMLInputElement>(null);
  useEffect(() => {
    setLoading(false);

    async function fetchGetPopMovies() {
      const data = await getPopularMovie(isPageIn, isLanguageIn, isRegionIn);
      setMovies(data.results);
      setPage(data.page);
      setLoading(true);

      if (data.total_pages >= 500) {
        setTotalPages(500);
      } else {
        setTotalPages(data.total_pages);
      }
    }

    async function fetchGetDiscoverMovie() {
      const data = await getMoviesDiscover(
        isPageIn,
        isLanguageIn,
        isRegionIn,
        sortAction
      );
      setMovies(data.results);
      setPage(data.page);
      setLoading(true);

      if (data.total_pages >= 500) {
        setTotalPages(500);
      } else {
        setTotalPages(data.total_pages);
      }
    }

    if (handleCallApi["main"]) {
      fetchGetPopMovies();
      console.log("Here kkk");
    } else if (handleCallApi["sortCall"]) {
      console.log("Here tuu");
      fetchGetDiscoverMovie();
    }

    if (isSearchButton) {
      console.log("data : " + sortAction);
      fetchGetDiscoverMovie();
      console.log("Call Api");
      setIsSearchButton(false);
      setHandleCallApi({
        ...handleCallApi,
        ["main"]: false,
        ["sortCall"]: true,
      });
    }

    if (isEnterSearch) {
      console.log("ef");
      setIsEnterSearch(false);
    }
  }, [isPageIn, isLanguageIn, isRegionIn, isSearchButton, isEnterSearch]);

  // useEffect(() => {
  //   if (isSearchButton) {
  //     console.log("data : " + sortAction);
  //     console.log("Call Api");
  //     setIsSearchButton(false);
  //     setHandleCallApi({...handleCallApi,["main"] : false,["sortCall"] : true});
  //   }

  //   if (isEnterSearch) {
  //     console.log("ef");
  //     setIsEnterSearch(false);
  //   }
  // }, [isSearchButton, isEnterSearch]);

  // useEffect(()=>{
  //   if(isEnterSearch){
  //     console.log("ef");
  //     setIsEnterSearch(false);
  //   }

  // },[isEnterSearch]);

  const movieElements = movies.map((movie, index) => {
    return <Movie key={index} results={movie} />;
  });

  const setSelectedPagenumber = (
    event: React.ChangeEvent<unknown>,
    value: number
  ) => {
    setIsPageIn(value);
  };

  const setSelectedLanguage = (event: SelectChangeEvent) => {
    setIsLanguageIn(event.target.value as string);
  };

  const setSelectedRegion = (event: SelectChangeEvent) => {
    setIsRegionIn(event.target.value as string);
  };

  const handleOnChangeTextSearch = (event: ChangeEvent<HTMLInputElement>) => {
    setSearchText(event.target.value);
  };

  function handleCallApiSearch() {
    console.log(searchText);
    console.log("run");
  }

  return (
    <Layout>
      <Grid spacing={10}>
        <Grid item xs={12} margin={1}>
          <TextField
            id="standard-basic"
            label="Search"
            variant="outlined"
            fullWidth
            value={searchText}
            onKeyPress={(event) => {
              if (event.key === "Enter") {
                event.preventDefault();
                handleCallApiSearch();
                setIsEnterSearch(true);
              }
            }}
            onChange={handleOnChangeTextSearch}
          />
        </Grid>
        <Grid item xs={12} spacing={2} margin={1} lg={12}>
          {isClickProps ? (
            <Button
              variant="contained"
              fullWidth
              color="success"
              size="large"
              style={{ cursor: "pointer" }}
              onClick={() => {
                setIsClickProps(false);
                setIsSearchButton(true);
              }}
            >
              Search
            </Button>
          ) : null}
          <Accordion>
            <AccordionSummary
              expandIcon={<ExpandMoreIcon />}
              aria-controls="panel1a-content"
              id="panel1a-header"
            >
              <Typography>Sort</Typography>
            </AccordionSummary>
            <AccordionDetails>
              <FormControl fullWidth>
                <InputLabel id="sorting" >Sort Results By</InputLabel>
                <SortSearch
                  setSortAction={setSortAction}
                  setOnClicked={setIsClickProps}
                ></SortSearch>
              </FormControl>
            </AccordionDetails>
          </Accordion>
          <Accordion>
            <AccordionSummary
              expandIcon={<ExpandMoreIcon />}
              aria-controls="panel1a-content"
              id="panel1a-header"
            >
              <Typography>Filters</Typography>
            </AccordionSummary>
            <AccordionDetails>
              <Genres></Genres>
            </AccordionDetails>
          </Accordion>
        </Grid>
      </Grid>
      <br />

      <Grid
        container
        spacing={3}
        direction="row"
        justifyContent="center"
        alignItems="center"
      >
        {loading ? (
          movieElements
        ) : (
          <Backdrop className="classes.backdrop" open>
            <CircularProgress color="secondary"></CircularProgress>
          </Backdrop>
        )}
      </Grid>
      <Hidden smUp>
        <Box
          display="flex"
          justifyContent="center"
          justifyItems="center"
          sx={{ m: "1rem" }}
        >
          <FormControl>
            <InputLabel id="demo-simple-select-label">{"Region"}</InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              value={isRegionIn}
              label={isRegionIn}
              onChange={setSelectedRegion}
            >
              <MenuItem value={"US"}>US</MenuItem>
              <MenuItem value={"TH"}>TH</MenuItem>
              <MenuItem value={"CN"}>CN</MenuItem>
              <MenuItem value={"JP"}>JP</MenuItem>
            </Select>
          </FormControl>
          &nbsp;
          <FormControl>
            <InputLabel id="demo-simple-select-label">{"Lang"}</InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              value={isLanguageIn}
              label={isLanguageIn}
              onChange={setSelectedLanguage}
            >
              <MenuItem value={"en"}>EN</MenuItem>
              <MenuItem value={"th"}>TH</MenuItem>
              <MenuItem value={"cn"}>CN</MenuItem>
              <MenuItem value={"jp"}>JP</MenuItem>
            </Select>
          </FormControl>
        </Box>

        <Box
          display="flex"
          justifyContent="center"
          justifyItems="center"
          sx={{ m: "1rem" }}
        >
          <Pagination
            count={totalPages}
            page={page}
            siblingCount={0}
            onChange={setSelectedPagenumber}
          />
        </Box>
      </Hidden>

      <Hidden smDown>
        <Box display="flex" justifyContent="center" sx={{ m: "5rem" }}>
          <Box
            display="flex"
            justifyContent="center"
            justifyItems="center"
            sx={{ m: "1rem" }}
          >
            <FormControl>
              <InputLabel id="demo-simple-select-label">{"Region"}</InputLabel>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={isRegionIn}
                label={isRegionIn}
                onChange={setSelectedRegion}
              >
                <MenuItem value={"US"}>US</MenuItem>
                <MenuItem value={"TH"}>TH</MenuItem>
                <MenuItem value={"CN"}>CN</MenuItem>
                <MenuItem value={"JP"}>JP</MenuItem>
              </Select>
            </FormControl>
            &nbsp;
            <FormControl>
              <InputLabel id="demo-simple-select-label">{"Lang"}</InputLabel>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={isLanguageIn}
                label={isLanguageIn}
                onChange={setSelectedLanguage}
              >
                <MenuItem value={"en"}>EN</MenuItem>
                <MenuItem value={"th"}>TH</MenuItem>
                <MenuItem value={"cn"}>CN</MenuItem>
                <MenuItem value={"jp"}>JP</MenuItem>
              </Select>
            </FormControl>
          </Box>
          <Box
            display="flex"
            justifyContent="center"
            justifyItems="center"
            sx={{ m: "2rem" }}
          >
            <Pagination
              count={totalPages}
              page={page}
              onChange={setSelectedPagenumber}
            />
          </Box>
        </Box>
      </Hidden>
    </Layout>
  );
}

export default Home;

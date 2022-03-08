import React, {
  useState,
  useEffect,
  ChangeEvent,
  FocusEvent,
  useMemo,
  useContext,
  Dispatch,
  SetStateAction,
  useRef,
} from "react";
import Layout from "../components/Layout";
import Movie from "../components/Movie";
import { RootObject } from "../interface/ResponseProps";
import {
  getPopularMovie,
  getMoviesDiscover,
  getListGenres,
  getSearchMovie,
} from "../Api/api";
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
  Typography,
  Switch,
  FormGroup,
  FormControlLabel,
} from "@mui/material";

import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import SortSearch from "../components/SortSearch";
import Genres from "../components/Genres";
import { RootObjectGenres, Genre } from "../interface/ResponseGenres";

interface Props {}

const Home = () => {
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
    discover: false,
    search: false,
  });

  const [listGenres, setListGenres] = useState<RootObjectGenres["genres"]>([]);
  const [genresId, setgenresId] = useState<RootObjectGenres["genres"]>([]);
  const [isFilterClicked, setIsFilterClicked] = useState<boolean>(false);
  const [test, setTest] = useState<string>("");
  const [isAdultsContents, setIsAdlutsContents] = useState<boolean>(false);
  const [isFocus, setIsFocus] = useState<boolean>(false);
  var with_genres: string = "";
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
        sortAction,
        with_genres,
        isAdultsContents
      );
      setMovies(data.results);
      setPage(data.page);
      setLoading(true);
      with_genres = "";
      if (data.total_pages >= 500) {
        setTotalPages(500);
      } else {
        setTotalPages(data.total_pages);
      }
    }

    async function fetchSearchMovies() {
      console.log(searchText);
      const data = await getSearchMovie(
        isLanguageIn,
        searchText,
        isPageIn,
        isAdultsContents,
        isRegionIn
      );

      if (data === null) {
        setMovies([]);
        setPage(0);
        setLoading(true);
        setTotalPages(0);
      }
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
    } else if (handleCallApi["discover"]) {
      console.log(genresId.length);
      if (genresId.length > 0) {
        with_genres = "";
        genresId.forEach((e) => {
          with_genres += e.id + ",";
        });
        console.log("Adults : " + isAdultsContents);
        with_genres = with_genres.slice(0, -1);
      }

      fetchGetDiscoverMovie();
    } else if (handleCallApi["search"]) {
      console.log("Call Search Only");
      fetchSearchMovies();
    }

    if (isSearchButton) {
      console.log("data : " + sortAction);
      console.log(genresId);
      if (sortAction || genresId) {
        setHandleCallApi({
          ...handleCallApi,
          ["main"]: false,
          ["discover"]: true,
          ["search"]: false,
        });
      }
      setIsSearchButton(false);
      console.log("Call Api : " + genresId.length);
    }

    if (isEnterSearch) {
      setHandleCallApi({
        ...handleCallApi,
        ["main"]: false,
        ["discover"]: false,
        ["search"]: true,
      });
      setIsEnterSearch(false);
    }
  }, [isPageIn, isLanguageIn, isRegionIn, isSearchButton, isEnterSearch]);

  useEffect(() => {
    async function fetchListGenres() {
      const data = await getListGenres(isLanguageIn, "movie");
      console.log(data.genres);
      setListGenres(data.genres);
      //console.log(listGenres);
    }

    fetchListGenres();
  }, [isLanguageIn]);

  const movieElements = useMemo(() => {
    console.log("useMemo");
    return movies.map((movie, index) => {
      return <Movie key={index} results={movie} />;
    });
  }, [movies]);

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

  const handleOnChangeTextSearch = (event: FocusEvent<HTMLInputElement>) => {
    //console.log(event.target.value)

    setSearchText(event.target.value);
    if (event.target.value.length > 0) {
      setIsFocus(true);
    }

    //setIsClickProps(true);
  };

  function handleCallApiSearch() {
    console.log(isAdultsContents);
    console.log("run");
  }

  return (
    <Layout>
      <Grid>
        <Grid item xs={12} margin={1}>
          <TextField
            id="standard-basic"
            label="Search"
            variant="outlined"
            fullWidth
            onChange={(e) => {
              if (e.target.value.length > 0) {
                setIsFocus(true);
              } else {
                setIsFocus(false);
              }
            }}
            onBlur={handleOnChangeTextSearch}
          />
        </Grid>
        <Grid item xs={12} margin={1} lg={12}>
          {isClickProps || isFilterClicked || isFocus ? (
            <Button
              variant="contained"
              fullWidth
              color="success"
              size="large"
              style={{ cursor: "pointer" }}
              onClick={() => {
                setIsClickProps(false);
                setIsFilterClicked(false);
                setTest("1");
                if (isFocus) {
                  setIsFocus(false);
                  setIsEnterSearch(true);
                } else {
                  setIsSearchButton(true);
                }
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
                <InputLabel id="sorting">Sort Results By</InputLabel>
                <SortSearch
                  typeMovie="movie"
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
              <Grid>
                <FormGroup>
                  <FormControlLabel
                    control={
                      <Switch
                        defaultChecked={false}
                        value={isAdultsContents}
                        onChange={() => {
                          setIsAdlutsContents(!isAdultsContents);
                          //setIsFilterClicked(true);
                        }}
                        color="warning"
                      />
                    }
                    label="Adult Contents"
                  />
                </FormGroup>
              </Grid>
              <br />
              <Grid
                container
                direction="row"
                justifyContent="space-between"
                alignItems="center"
              >
                {listGenres
                  ? listGenres.map((genre) => {
                      return (
                        <Genres
                          props={genre}
                          key={genre.id}
                          setOnClicked={setIsFilterClicked}
                          setGenresId={setgenresId}
                          genesId={genresId}
                        ></Genres>
                      );
                    })
                  : null}
              </Grid>
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
};

export default Home;

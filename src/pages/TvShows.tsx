import React, { useContext, useEffect, useState, FocusEvent } from "react";
import Layout from "../components/Layout";
import {
  Grid,
  TextField,
  Accordion,
  AccordionSummary,
  Typography,
  AccordionDetails,
  FormControl,
  InputLabel,
  FormGroup,
  Switch,
  FormControlLabel,
  Button,
  Skeleton,
  Box,
  Card,
  CardHeader,
  CardContent,
  Pagination,
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import SortSearch from "../components/SortSearch";
import { getListGenres } from "../Api/api";
import LanguageContext from "../context/LanguageContext";
import RegionContext from "../context/RegionContext";
import PageContext from "../context/PageContext";
import { RootObjectGenres, Genre } from "../interface/ResponseGenres";
import Genres from "../components/Genres";

type Props = {};

const TvShows = () => {
  const [sortAction, setSortAction] = useState<string>("");
  const [isClickProps, setIsClickProps] = useState<boolean>(false);
  const [listGenres, setListGenres] = useState<RootObjectGenres["genres"]>([]);
  const [genresId, setgenresId] = useState<RootObjectGenres["genres"]>([]);
  const [isAdultsContents, setIsAdlutsContents] = useState<boolean>(false);
  const [isFilterClicked, setIsFilterClicked] = useState<boolean>(false);
  const [isFocus, setIsFocus] = useState<boolean>(false);
  const [test, setTest] = useState<string>("");
  const [isEnterSearch, setIsEnterSearch] = useState<boolean>(false);
  const [isSearchButton, setIsSearchButton] = useState<boolean>(false);
  const [searchText, setSearchText] = useState<string>("");
  const { isLanguageIn, setIsLanguageIn } = useContext(LanguageContext);
  const obj = [
    11111111111111111111, 11111111111111111111, 11111111111111111111,
    11111111111111111111, 11111111111111111111, 11111111111111111111,
    11111111111111111111, 11111111111111111111, 11111111111111111111,
    11111111111111111111, 11111111111111111111, 11111111111111111111,
    11111111111111111111, 11111111111111111111, 11111111111111111111,
    11111111111111111111, 11111111111111111111, 11111111111111111111,
    11111111111111111111, 11111111111111111111,
  ];
  const [mock, setMock] = useState<Array<number>>(obj);

  useEffect(() => {
    async function fetchGenresList() {
      const data = await getListGenres(isLanguageIn, "tv");
      setListGenres(data.genres);
      console.log(data.genres);
    }

    fetchGenresList();
  }, [isLanguageIn]);

  const handleOnChangeTextSearch = (event: FocusEvent<HTMLInputElement>) => {
    //console.log(event.target.value)

    setSearchText(event.target.value);
    if (event.target.value.length > 0) {
      setIsFocus(true);
    }

    //setIsClickProps(true);
  };

  return (
    <Layout>
      <Grid>
        <Grid item xs={12} margin={1}>
          <TextField
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
                typeMovie="tv"
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
        {mock.map((item, index) => {
          return (
            <Grid item xs sx={{ m: "0.5rem" }}>
              <Card key={index}>
                <CardHeader />
                <CardContent>{item}</CardContent>
              </Card>
            </Grid>
          );
        })}
      </Grid>
      <Box
        display="flex"
        justifyContent="center"
        justifyItems="center"
        sx={{ m: "1rem" }}
      >
        <Pagination count={500} page={1} siblingCount={0} />
      </Box>
    </Layout>
  );
};

export default TvShows;

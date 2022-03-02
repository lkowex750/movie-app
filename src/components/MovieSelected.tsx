import React, { useContext, useEffect, useState } from "react";
import "./style/MovieSelected.css";
import { RootObject } from "../interface/ResponseDetailMovie";
import MovieContext from "../context/MovieSelectedContext";
import LanguageContext from "../context/LanguageContext";
import RegionContext from "../context/RegionContext";
import { getMovieDetail } from "../Api/api";
import { LazyLoadComponent } from "react-lazy-load-image-component";
import ShowMoreText from "react-show-more-text";
import { Typography, Box, Grid, Button } from "@mui/material";
import PlayArrowIcon from "@mui/icons-material/PlayArrow";
import InfoIcon from "@mui/icons-material/Info";
import LayoutForSelectPage from "./LayoutForSelectPage";

function MovieSelected(value: RootObject) {
  const { id, title, backdrop_path, release_date } = useContext(MovieContext);
  const { isRegionIn } = useContext(RegionContext);
  const { isLanguageIn } = useContext(LanguageContext);
  const [poster, setPoster] = useState<string>("");
  const [movies, setMovies] = useState<RootObject>();
  let path = "https://image.tmdb.org/t/p/original" + backdrop_path;
  let pathPost = "https://image.tmdb.org/t/p/original";
  let setRelease_date = "";

  if (backdrop_path == null) {
    path =
      "https://upload.wikimedia.org/wikipedia/commons/6/65/No-Image-Placeholder.svg";
  }
  try {
    var splitted = release_date.split("-", 3);

    setRelease_date = splitted[0];
  } catch (error) {
    setRelease_date = "unknow";
  }

  useEffect(() => {
    async function fetchGetMovieDetail() {
      const data = await getMovieDetail(id, isLanguageIn, isRegionIn);

      setPoster(pathPost + data.poster_path);
      setMovies(data);

      if (data.poster_path == null) {
        setPoster(path);
      }
    }

    fetchGetMovieDetail();
  }, [isLanguageIn]);

  return (
    <LazyLoadComponent>
      <LayoutForSelectPage>
        <Grid style={{ height: "100vh", position: "relative" }}>
          <img
            src={path}
            style={{
              width: "100%",
              height: "100%",
              objectFit: "cover",
              filter: "brightness(45%)",
            }}
          />

          <Grid
            item
            lg={12}
            sm={2}
            xs={12}
            style={{
              color: "white",
              width: "75%",
              position: "absolute",
              left: "50px",
              bottom: "100px",
              display: "flex",
              flexDirection: "column",
            }}
          >
            <Typography
              variant="h1"
              style={{
                fontSize: "2em",

                filter: "drop-shadow(1px 5px 4px black)",
              }}
            >
              {movies?.title + " (" + setRelease_date + ") "}
            </Typography>
            <br />
            <Box
              style={{
                height: "inherit",
                width: "100%",
                left: "50px",
                bottom: "10px",
                color: "white",
                display: "flex",
                flexDirection: "column",
                filter: "drop-shadow(5px 10px 4px gray)",
              }}
            >
              <img src={poster} style={{ height: "300px", width: "200px" }} />
            </Box>
            <br />
            <ShowMoreText
              lines={2}
              more="Show more"
              less="Show less"
              truncatedEndingComponent={" ... "}
              anchorClass="showmore"
            >
              <span
                style={{
                  margin: "20px 0px",
                  filter: "drop-shadow(1px 6px 6px black)",
                }}
              >
                {movies?.overview}
              </span>
            </ShowMoreText>
            <br />
            {/* <Box style={{ display: "flex" }}>
              <Button
                variant="contained"
                style={{
                  padding: "10px 20px",
                  border: "none",
                  borderRadius: "5px",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontSize: "18px",
                  fontWeight: "500",
                  marginRight: "10px",
                  cursor: "pointer",
                }}
              >
                <PlayArrowIcon />
                <span style={{ color: "white" }}>Play</span>
              </Button>

              <Button
                variant="contained"
                style={{
                  padding: "10px 20px",
                  border: "none",
                  borderRadius: "5px",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontSize: "18px",
                  fontWeight: "500",
                  marginRight: "10px",
                  cursor: "pointer",
                }}
              >
                <InfoIcon style={{ color: "white" }} />
                <span style={{ color: "white" }}>Info</span>
              </Button>
            </Box> */}
          </Grid>
        </Grid>
      </LayoutForSelectPage>
    </LazyLoadComponent>
  );
}

export default MovieSelected;

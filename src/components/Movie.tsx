import React, { useContext, useEffect, useState } from "react";
import { Result } from "../interface/ResponseProps";
import "./style/Movie.css";
import MovieContext from "../context/MovieSelectedContext";
import { useNavigate } from "react-router-dom";
import {
  Grid,
  Card,
  CardContent,
  Typography,
  CardActions,
  Button,
  CardHeader,
  CircularProgress,
  Box,
} from "@mui/material";
import { CircularProgressbarWithChildren } from "react-circular-progressbar";
import {
  LazyLoadImage,
  LazyLoadComponent,
} from "react-lazy-load-image-component";

interface Props {
  results: Result;
}

const Movie = (props: Props) => {
  const { setId, setBackdrop_path, setTitle, setRelease_date ,setTypeMovie} =
    useContext(MovieContext);

  const navigate = useNavigate();

  const handleOnClicked = () => {
    var str = props.results.title;
    str = str.replace(/\s+/g, "-").toLowerCase();
    str = str.replaceAll(":", "");
    str = str.replaceAll("/", "");
    str = str.replaceAll("\\", "");
    var path = "/movie/" + str;
    setId(props.results.id);
    setTitle(props.results.title);
    setBackdrop_path(props.results.backdrop_path);
    setRelease_date(props.results.release_date);
    setTypeMovie("movie");
    navigate(path);
  };

  //https://image.tmdb.org/t/p/w500
  //https://image.tmdb.org/t/p/original
  let path = "https://image.tmdb.org/t/p/original" + props.results.poster_path;

  if (props.results.poster_path == null) {
    path =
      "https://upload.wikimedia.org/wikipedia/commons/6/65/No-Image-Placeholder.svg";
  }

  return (
    <Grid item xs sx={{ m: "0.5rem" }}>
      <LazyLoadComponent
        placeholder={<CircularProgress color="secondary"></CircularProgress>}
      >
        <Card>
          <CardHeader
            title={
              <div
                style={{
                  overflow: "hidden",             
                  width: "11rem",
                }}
              >
                <Typography
                  component="div"
                  sx={{
                    fontSize: 20,
                    fontWeight: 600,
                    textOverflow: "ellipsis",
                    cursor: "pointer",
                  }}
                  color="primary"
                  noWrap
                  gutterBottom
                  onClick={handleOnClicked}
                >
                  {props.results.title}
                </Typography>
              </div>
            }
          />
          <CardContent>
            <Box display="flex" justifyContent="center" justifyItems="center">
              <LazyLoadImage
                src={path}
                style={{ width: "100%", height: "370px" }}
                onClick={handleOnClicked}
                effect="blur"
              />
            </Box>

            {/* <img src={path} style={{ width: "100%", height: "400px" }} onClick={handleOnClicked} loading="lazy"></img> */}

            <Box display="flex" justifyContent="center" justifyItems="center">
              <Typography
                sx={{ mb: 1.5 }}
                style={{ color: "black", backgroundColor: "#f3ce13" }}
                fontWeight="600"
              >
                IMDb score
              </Typography>
            </Box>

            <Box display="flex" justifyContent="center" justifyItems="center">
              <div style={{ width: 70, height: 70 }}>
                <CircularProgressbarWithChildren
                  value={props.results.vote_average * 10}
                  styles={{
                    root: {},
                    // Customize the path, i.e. the "completed progress"
                    path: {
                      // Path color
                      stroke: `rgba(62, 152, 199, ${props.results.vote_average})`,
                      // Whether to use rounded or flat corners on the ends - can use 'butt' or 'round'
                      strokeLinecap: "butt",
                      // Customize transition animation
                      transition: "stroke-dashoffset 0.5s ease 0s",
                      // Rotate the path
                      transform: "rotate(0.25turn)",
                      transformOrigin: "center center",
                    },

                    trail: {
                      // Trail color
                      stroke: "#d6d6d6",

                      strokeLinecap: "butt",
                      // Rotate the trail
                      transform: "rotate(0.25turn)",
                      transformOrigin: "center center",
                    },

                    text: {
                      // Text color
                      fill: "#f88",
                      // Text size
                      fontSize: "16px",
                    },

                    background: {
                      fill: "#3e98c7",
                    },
                  }}
                >
                  {/* <img
                style={{ width: 30, marginTop: -15 }}
                src="https://upload.wikimedia.org/wikipedia/commons/thumb/6/69/IMDB_Logo_2016.svg/2560px-IMDB_Logo_2016.svg.png"
                alt="doge"
              /> */}
                  <div style={{ fontSize: 20, marginTop: -10 }}>
                    <strong>{props.results.vote_average * 10}%</strong>
                  </div>
                </CircularProgressbarWithChildren>
              </div>
            </Box>
          </CardContent>
          <CardActions>
            <Button
              size="small"
              onClick={handleOnClicked}
              variant={"contained"}
              fullWidth
            >
              View Detail
            </Button>
          </CardActions>
        </Card>
      </LazyLoadComponent>
    </Grid>
  );
};

export default Movie;

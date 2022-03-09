import React, { useContext, useEffect, useState } from "react";
import "./style/MovieSelected.css";
import { RootObject } from "../interface/ResponseDetailMovie";
import MovieContext from "../context/MovieSelectedContext";
import LanguageContext from "../context/LanguageContext";
import RegionContext from "../context/RegionContext";
import {
  getMovieDetail,
  getMovieDetailTv,
  getCredits,
  getMovieReviews,
} from "../Api/api";
import {
  LazyLoadComponent,
  LazyLoadImage,
} from "react-lazy-load-image-component";
import ShowMoreText from "react-show-more-text";
import {
  Typography,
  Box,
  Grid,
  Button,
  Card,
  CardHeader,
  CardContent,
  Link,
  TextareaAutosize,
  Avatar,
  Rating,
} from "@mui/material";

import LayoutForSelectPage from "./LayoutForSelectPage";
import FavoiritesContext from "../context/FavoritesContext";
import StarIcon from "@mui/icons-material/Star";
import { useParams } from "react-router-dom";
import { RootObjectTv } from "../interface/ResponseDetailTv";
import { Credits } from "../interface/ResponseCastProps";
import { Reviews } from "../interface/ResponseReviews";

function MovieSelected(value: RootObject) {
  const { id, title, backdrop_path, release_date, typeMovie } =
    useContext(MovieContext);
  const { isRegionIn } = useContext(RegionContext);
  const { isLanguageIn } = useContext(LanguageContext);
  const [poster, setPoster] = useState<string>("");
  const [movies, setMovies] = useState<RootObject>();
  const [tvs, setTvs] = useState<RootObjectTv>();
  const { isFavoiritesIn, setIsFavoiritesIn } = useContext(FavoiritesContext);
  const [statusButton, setStatusButton] = useState<boolean>(false);
  const [cast, setCast] = useState<Credits["cast"]>([]);
  const [reviews, setReviews] = useState<Reviews["results"]>([]);
  let path = "https://image.tmdb.org/t/p/original" + backdrop_path;
  let pathPost = "https://image.tmdb.org/t/p/original";

  let setRelease_date = "";

  let params = useParams();
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
      if (params.type === "movie") {
        const data = await getMovieDetail(id, isLanguageIn, isRegionIn);
        const credits = await getCredits(id, isLanguageIn, "movie");
        const reviewsData = await getMovieReviews(id, isLanguageIn, "movie");

        setCast(credits.cast);
        setPoster(pathPost + data.poster_path);
        setMovies(data);
        setReviews(reviewsData.results);

        if (data.poster_path == null) {
          setPoster(path);
          setTvs(data);
        }
      } else {
        const data = await getMovieDetailTv(id, isLanguageIn);
        const credits = await getCredits(id, isLanguageIn, "tv");
        const reviewsData = await getMovieReviews(id, isLanguageIn, "tv");
        setReviews(reviewsData.results);
        setCast(credits.cast);
        setPoster(pathPost + data.poster_path);
        setTvs(data);
        if (data.poster_path == null) {
          setPoster(path);
          setTvs(data);
        }
      }
    }

    fetchGetMovieDetail();
  }, [isLanguageIn]);

  useEffect(() => {
    isFavoiritesIn.forEach((e) => {
      if (e.id === id) {
        return setStatusButton(true);
      }
    });
  }, [statusButton]);

  const handleSetFavoriteMovie = () => {
    //let pathPoster = "https://image.tmdb.org/t/p/original";

    let val = new Set(isFavoiritesIn);
    val.add({
      id: id,
      title: title,
      poster:
        "https://image.tmdb.org/t/p/original" +
        (params.type === "movie" ? movies?.poster_path : tvs?.poster_path),
      backdrop_path: backdrop_path,
      typeMovie: params.type === "movie" ? "movie" : "tv",
    });

    setIsFavoiritesIn(Array.from(val));
    setStatusButton(true);
  };

  const handleUnFav = () => {
    let val = new Set(isFavoiritesIn);
    isFavoiritesIn.forEach((e) => {
      if (e.id === id) {
        val.delete(e);
      }
    });
    setIsFavoiritesIn(Array.from(val));
    setStatusButton(false);
  };

  const reviewElements = reviews.map((review, index) => {
    let ava_path = "https://image.tmdb.org/t/p/original";
    var date = new Date(review.updated_at);
    if (review.author_details.avatar_path !== null) {
      const checkHttps: Array<string> =
        review.author_details.avatar_path.split("/");

      if (checkHttps[1] === "https:") {
        ava_path = review.author_details.avatar_path.substring(1);
      } else {
        ava_path = ava_path + review.author_details.avatar_path;
      }
    } else {
      ava_path =
        "https://i.pinimg.com/originals/d6/7f/cb/d67fcb293e7ab5d6fdd92cb9bc639b3b.png";
    }
    return (
      <Grid item key={index} marginBottom={1}>
        <Card>
          <CardHeader
            avatar={<Avatar aria-label={review.author} src={ava_path}></Avatar>}
            title={<Typography fontWeight={600}>{review.author}</Typography>}
            action={
              <Box>
                <Rating
                  name="text-feedback"
                  value={review.author_details.rating / 2}
                  readOnly
                  precision={0.5}
                  emptyIcon={
                    <StarIcon style={{ opacity: 0.55 }} fontSize="inherit" />
                  }
                />
              </Box>
            }
            subheader={date.toUTCString()}
          />
          <CardContent>
            <TextareaAutosize
              maxRows={5}
              aria-label="maximum height"
              placeholder="Maximum 4 rows"
              defaultValue={review.content}
              style={{ width: "100%", border: "none", resize: "none" }}
            />
          </CardContent>
        </Card>
      </Grid>
    );
  });

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
            {params.type === "movie" ? (
              <Typography
                variant="h1"
                style={{
                  fontSize: "2em",

                  filter: "drop-shadow(1px 5px 4px black)",
                }}
              >
                {movies?.title + " (" + setRelease_date + ") "}
              </Typography>
            ) : (
              <Typography
                variant="h1"
                style={{
                  fontSize: "2em",

                  filter: "drop-shadow(1px 5px 4px black)",
                }}
              >
                {tvs?.name + " (" + setRelease_date + ") "}
              </Typography>
            )}
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
              {params.type === "movie" ? (
                <span
                  style={{
                    margin: "20px 0px",
                    filter: "drop-shadow(1px 6px 6px black)",
                  }}
                >
                  {movies?.overview}
                </span>
              ) : (
                <span
                  style={{
                    margin: "20px 0px",
                    filter: "drop-shadow(1px 6px 6px black)",
                  }}
                >
                  {tvs?.overview}
                </span>
              )}
            </ShowMoreText>
            <br />
            <Box style={{ display: "flex" }}>
              {statusButton ? (
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
                  onClick={handleUnFav}
                >
                  <StarIcon />
                  <span style={{ color: "white" }}>Unfavorite</span>
                </Button>
              ) : (
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
                  onClick={handleSetFavoriteMovie}
                >
                  <StarIcon />
                  <span style={{ color: "white" }}>favorite</span>
                </Button>
              )}
            </Box>
          </Grid>
        </Grid>

        <Typography
          variant="h4"
          fontWeight={600}
          marginTop={2}
          marginBottom={2}
        >
          Cast
        </Typography>

        <Grid
          container
          direction="row"
          justifyContent="center"
          alignItems="center"
          marginBottom={2}
        >
          {cast.slice(0, 6).map((item) => {
            var profilePath = pathPost;
            if (item.profile_path === null) {
              profilePath =
                "https://i.pinimg.com/originals/d6/7f/cb/d67fcb293e7ab5d6fdd92cb9bc639b3b.png";
            } else {
              profilePath = profilePath + item.profile_path;
            }
            return (
              <Grid item xs={5} lg={2} md={3} key={item.id}>
                <Card style={{ height: "320px" }}>
                  <CardContent>
                    <Box
                      display="flex"
                      justifyContent="center"
                      justifyItems="center"
                    >
                      <LazyLoadImage
                        src={profilePath}
                        style={{ width: "100%", height: "200px" }}
                        effect="blur"
                      />
                    </Box>
                    <Box>
                      <Typography fontWeight={600}>{item.name}</Typography>
                      <Typography color="gray">{item.character}</Typography>
                    </Box>
                  </CardContent>
                </Card>
              </Grid>
            );
          })}
        </Grid>

        <Grid
          container
          direction="row"
          justifyContent="center"
          alignItems="center"
        >
          <Link underline="none" style={{ cursor: "pointer" }}>
            <Typography fontWeight={600}>Full Cast & Crew</Typography>
          </Link>
        </Grid>
        {reviews.length > 0 ? (
          <Grid marginTop={3}>
            <Typography variant="h4" fontWeight={600}>
              Review
            </Typography>
            <br />
            {reviewElements}
          </Grid>
        ) : null}
        <br />
      </LayoutForSelectPage>
    </LazyLoadComponent>
  );
}

export default MovieSelected;

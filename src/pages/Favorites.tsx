import React, { useContext, useEffect, useMemo, useState } from "react";
import Layout from "../components/Layout";
import FavoiritesContext from "../context/FavoritesContext";
import {
  CircularProgress,
  Grid,
  Card,
  CardHeader,
  Typography,
  CardContent,
  Box,
  CardActions,
  Button,
} from "@mui/material";
import MovieContext from "../context/MovieSelectedContext";
import LanguageContext from "../context/LanguageContext";
import { useNavigate } from "react-router-dom";
import {
  LazyLoadImage,
  LazyLoadComponent,
} from "react-lazy-load-image-component";
import { useTranslation } from "react-i18next";
type Props = {};

const Favorites = (props: Props) => {
  const { isFavoiritesIn, setIsFavoiritesIn } = useContext(FavoiritesContext);
  const { setId, setBackdrop_path, setTitle, setRelease_date } =
    useContext(MovieContext);
  const { isLanguageIn } = useContext(LanguageContext);
  const navigate = useNavigate();
  const { t } = useTranslation();

  function handleOnClicked(
    id: number,
    title: string,
    backdrop_path: string,
    typeMovie: string
  ) {
    //console.warn(id);
    var str = title;
    str = str.replace(/\s+/g, "-").toLowerCase();
    str = str.replaceAll(":", "");
    str = str.replaceAll("/", "");
    str = str.replaceAll("\\", "");
    var path = (typeMovie === "movie" ? "/movie/" : "/tv/") + str;
    setId(id);
    setTitle(title);
    setBackdrop_path(backdrop_path);
    // setRelease_date(props.results.release_date);
    navigate(path);
  }
  const favoisElements = useMemo(() => {
    if (isFavoiritesIn.length > 0) {
      return isFavoiritesIn.map((movie, index) => {
        return (
          <Grid item xs sx={{ m: "0.5rem" }} key={index}>
            <LazyLoadComponent
              placeholder={
                <CircularProgress color="secondary"></CircularProgress>
              }
              key={index}
            >
              <Card
                style={{
                  backgroundColor: "#FBAD5B",
                  borderRadius: 0,
                  boxShadow: "none",
                }}
                key={index}
              >
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
                        color="white"
                        noWrap
                        gutterBottom
                        onClick={() => {
                          handleOnClicked(
                            movie.id,
                            movie.title,
                            movie.backdrop_path,
                            movie.typeMovie
                          );
                        }}
                      >
                        {movie.title}
                      </Typography>
                    </div>
                  }
                />
                <CardContent>
                  <Box
                    display="flex"
                    justifyContent="center"
                    justifyItems="center"
                  >
                    <LazyLoadImage
                      src={movie.poster}
                      style={{ width: "100%", height: "370px" }}
                      onClick={() => {
                        handleOnClicked(
                          movie.id,
                          movie.title,
                          movie.backdrop_path,
                          movie.typeMovie
                        );
                      }}
                      effect="blur"
                    />
                  </Box>

                  {/* <img src={path} style={{ width: "100%", height: "400px" }} onClick={handleOnClicked} loading="lazy"></img> */}
                </CardContent>
                <CardActions>
                  <Button
                    size="small"
                    onClick={() => {
                      handleOnClicked(
                        movie.id,
                        movie.title,
                        movie.backdrop_path,
                        movie.typeMovie
                      );
                    }}
                    variant={"contained"}
                    fullWidth
                  >
                    {t("viewDetail")}
                  </Button>
                </CardActions>
              </Card>
            </LazyLoadComponent>
          </Grid>
        );
      });
    } else {
      return (
        <>
          <br />
          <br />
          <h1>You don't have Movies Favorites</h1>
        </>
      );
    }
  }, [isFavoiritesIn]);

  const [loading, setLoading] = useState<boolean>(false);
  let count: number = 0;
  useEffect(() => {
    //window.location.href = "/favorites"
  }, [isLanguageIn]);

  return (
    <Layout>
      <Typography variant="h3">{t("yourFav")}</Typography>
      <br />
      <Grid
        container
        spacing={3}
        direction="row"
        justifyContent="center"
        alignItems="center"
      >
        {isFavoiritesIn.length > 0 ? (
          isFavoiritesIn.map((movie, index) => {
            return (
              <Grid item xs sx={{ m: "0.5rem" }} key={index}>
                <LazyLoadComponent
                  placeholder={
                    <CircularProgress color="secondary"></CircularProgress>
                  }
                  key={index}
                >
                  <Card
                    style={{
                      backgroundColor: "#FBAD5B",
                      borderRadius: 0,
                      boxShadow: "none",
                    }}
                    key={index}
                  >
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
                            color="white"
                            noWrap
                            gutterBottom
                            onClick={() => {
                              handleOnClicked(
                                movie.id,
                                movie.title,
                                movie.backdrop_path,
                                movie.typeMovie
                              );
                            }}
                          >
                            {movie.title}
                          </Typography>
                        </div>
                      }
                    />
                    <CardContent>
                      <Box
                        display="flex"
                        justifyContent="center"
                        justifyItems="center"
                      >
                        <LazyLoadImage
                          src={movie.poster}
                          style={{ width: "100%", height: "370px" }}
                          onClick={() => {
                            handleOnClicked(
                              movie.id,
                              movie.title,
                              movie.backdrop_path,
                              movie.typeMovie
                            );
                          }}
                          effect="blur"
                        />
                      </Box>

                      {/* <img src={path} style={{ width: "100%", height: "400px" }} onClick={handleOnClicked} loading="lazy"></img> */}
                    </CardContent>
                    <CardActions>
                      <Button
                        size="small"
                        onClick={() => {
                          handleOnClicked(
                            movie.id,
                            movie.title,
                            movie.backdrop_path,
                            movie.typeMovie
                          );
                        }}
                        variant={"contained"}
                        fullWidth
                      >
                        {t("viewDetail")}
                      </Button>
                    </CardActions>
                  </Card>
                </LazyLoadComponent>
              </Grid>
            );
          })
        ) : (
          <>
            <br />
            <br />
            <h1>{t("fav_empty")}</h1>
          </>
        )}
      </Grid>
    </Layout>
  );
};

export default Favorites;

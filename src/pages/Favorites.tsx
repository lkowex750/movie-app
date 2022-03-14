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
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Slide,
} from "@mui/material";
import MovieContext from "../context/MovieSelectedContext";
import LanguageContext from "../context/LanguageContext";
import { useNavigate } from "react-router-dom";
import {
  LazyLoadImage,
  LazyLoadComponent,
} from "react-lazy-load-image-component";
import { useTranslation } from "react-i18next";
import Movie_Style from "../components/style/Movie_Style";
type Props = {};

const Favorites = (props: Props) => {
  const { isFavoiritesIn, setIsFavoiritesIn } = useContext(FavoiritesContext);
  const { setId, setBackdrop_path, setTitle, setRelease_date } =
    useContext(MovieContext);
  const { isLanguageIn, setIsLanguageIn } = useContext(LanguageContext);
  const [open, setOpen] = useState<boolean>(false);
  const navigate = useNavigate();
  const { t } = useTranslation();

  const classes = Movie_Style();
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
    var path = (typeMovie === "movie" ? "/movie/" : "/tv/") + id + "-" + str;
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
                    className={classes.button_detail}
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

  const handleOnClearClicked = () => {
    let val = new Set(isFavoiritesIn);
    val.clear();
    setIsFavoiritesIn(Array.from(val));
    setOpen(false);
  };

  const handleClickedOpen = () => {
    setOpen(true);
  };
  const handleClickedClose = () => {
    setOpen(false);
  };

  return (
    <Layout>
      <Typography variant="h3">{t("yourFav")}</Typography>
      <br />
      <Button onClick={handleClickedOpen}>{t("clear_button")}</Button>
      {/* <Slide direction="up" in={open}>
       
     </Slide> */}
      <Dialog
        open={open}
        onClose={handleClickedClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          {t("dialog_clear_title")}
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            {t("dialog_clear_content")}
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleOnClearClicked}>{t("yes_button")}</Button>
          <Button onClick={handleClickedClose} autoFocus>
            {t("no_button")}
          </Button>
        </DialogActions>
      </Dialog>
      <Grid
        container
        spacing={3}
        direction="row"
        justifyContent="center"
        alignItems="center"
        marginBottom={20}
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
                  <Card className={classes.card_fav_bg} key={index}>
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
                        className={classes.button_detail}
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
          <div style={{ marginBottom: "200px" }}>
            <br />
            <br />
            <h1>{t("fav_empty")}</h1>
          </div>
        )}
      </Grid>
    </Layout>
  );
};

export default Favorites;

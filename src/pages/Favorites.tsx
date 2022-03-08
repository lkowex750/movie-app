import React, { useContext, useMemo, useState } from "react";
import Layout from "../components/Layout";
import FavoiritesContext from "../context/FavoritesContext";
import {
  Backdrop,
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
import { useNavigate } from "react-router-dom";
import {
  LazyLoadImage,
  LazyLoadComponent,
} from "react-lazy-load-image-component";
type Props = {};

const Favorites = (props: Props) => {
  const { isFavoiritesIn, setIsFavoiritesIn } = useContext(FavoiritesContext);
  const { setId, setBackdrop_path, setTitle, setRelease_date } =
    useContext(MovieContext);

  const navigate = useNavigate();

  function handleOnClicked(id: number, title: string, backdrop_path: string, typeMovie : string) {
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
    console.log(isFavoiritesIn.length);
    if (isFavoiritesIn.length > 0) {
      return isFavoiritesIn.map((movie) => {
        return (
          <>
            <Grid item xs sx={{ m: "0.5rem" }} key={movie.id}>
              <LazyLoadComponent
                placeholder={
                  <CircularProgress color="secondary"></CircularProgress>
                }
              >
                <Card style={{backgroundColor: "#FBAD5B",borderRadius: 0,boxShadow: "none"}} >
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
                      View Detail
                    </Button>
                  </CardActions>
                </Card>
              </LazyLoadComponent>
            </Grid>
          </>
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
  }, []);

  const [loading, setLoading] = useState<boolean>(false);
  let count: number = 0;

  return (
    <Layout>
      <Typography variant="h3">Your Favorites</Typography>
      <br />
      <Grid
        container
        spacing={3}
        direction="row"
        justifyContent="center"
        alignItems="center"
      >
        {favoisElements}
      </Grid>
    </Layout>
  );
};

export default Favorites;

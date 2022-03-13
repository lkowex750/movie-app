import React from "react";
import { Grid, CircularProgress, Typography } from "@mui/material";
import { Cast } from "../interface/ResponseCastProps";
import {
  LazyLoadImage,
  LazyLoadComponent,
} from "react-lazy-load-image-component";

interface Props {
  cast: Cast;
}

const CastList = (value: Props) => {
  let path = "https://image.tmdb.org/t/p/original";
  if (value.cast.profile_path == null) {
    path =
      "https://upload.wikimedia.org/wikipedia/commons/6/65/No-Image-Placeholder.svg";
  } else {
    path = path + value.cast.profile_path;
  }
  return (
    <Grid item marginBottom={2}>
      <LazyLoadComponent
        placeholder={<CircularProgress color="secondary"></CircularProgress>}
      >
        <Grid
          container
          //direction="row"
          justifyContent="flex-start"
          alignItems="flex-start"
        >
          <LazyLoadImage
            src={path}
            effect="blur"
            style={{ width: "100%", height: "100px" }}
          />
          <Grid
            //direction="column"
            justifyContent="flex-start"
            alignItems="flex-start"
            marginTop={3}
            marginLeft={5}
          >
            <Typography fontWeight={600}>{value.cast.name}</Typography>
            <Typography variant="caption">{value.cast.character}</Typography>
          </Grid>
        </Grid>
      </LazyLoadComponent>
    </Grid>
  );
};

export default CastList;

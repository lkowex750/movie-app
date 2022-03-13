import React from "react";
import { Crew } from "../interface/ResponseCastProps";
import { Grid, CircularProgress, Typography } from "@mui/material";
import {
  LazyLoadImage,
  LazyLoadComponent,
} from "react-lazy-load-image-component";

interface Props {
  crew: Crew;
}

const CrewList = (value: Props) => {
  let path = "https://image.tmdb.org/t/p/original";
  if (value.crew.profile_path == null) {
    path =
      "https://upload.wikimedia.org/wikipedia/commons/6/65/No-Image-Placeholder.svg";
  } else {
    path = path + value.crew.profile_path;
  }
  return (
    <Grid item marginBottom={2}>
      <LazyLoadComponent
        placeholder={<CircularProgress color="secondary"></CircularProgress>}
      >
        <Grid
          container
          // direction="row"
          justifyContent="flex-start"
          alignItems="flex-start"
        >
          <LazyLoadImage
            src={path}
            effect="blur"
            style={{ width: "100%", height: "100px" }}
          />
          <Grid
            // direction="column"
            justifyContent="flex-start"
            alignItems="flex-start"
            marginLeft={5}
            marginTop={3}
          >
            <Typography fontWeight={600}>{value.crew.name}</Typography>
            <Typography variant="caption">{value.crew.job}</Typography>
          </Grid>
        </Grid>
      </LazyLoadComponent>
    </Grid>
  );
};

export default CrewList;

import React, { useEffect, useState } from "react";
import { getMovieProviders, getTvProviders } from "../Api/api";
import { WatchProviders } from "../interface/WatchProvidersInterface";
import {
  Grid,
  ToggleButton,
  Paper,
  FormControl,
  FormGroup,
  FormControlLabel,
  Checkbox,
} from "@mui/material";
import { url } from "inspector";
import { Result } from "../interface/WatchProvidersInterface";

interface Props {
  typeMovie: string;
  watch_provider: Result;
}

const Watch_providers = (props: Props) => {
  //   const [watchProviders, setWatchProviders] = useState<
  //     WatchProviders["results"]
  //   >([]);
  //   const [selected, setSelected] = useState<Array<boolean>>([false]);
  const [check, setCheck] = useState<boolean>(false);
  let path = "https://image.tmdb.org/t/p/original";
  //   useEffect(() => {
  //     async function fetchMovieProviders() {
  //       const data = await getMovieProviders("en");
  //       console.log(data.results);
  //       setWatchProviders(data.results);
  //     }
  //     async function fetchTvProviders() {
  //       const data = await getTvProviders("en");
  //       setWatchProviders(data.results);
  //     }

  //     if (props.typeMovie === "movie") {
  //       fetchMovieProviders();
  //     } else {
  //       fetchTvProviders();
  //     }
  //   }, []);

  const handleOnClicked = () => {
    setCheck(!check);
  };
  return (
    <Grid item margin={1} xs={3} md={2}>
      <FormControl>
        <FormGroup>
          <FormControlLabel
            control={
              <Checkbox
                color="primary"
                checked={check}
                onClick={handleOnClicked}
              />
            }
            label={
              <React.Fragment>
                <img
                  src={path + props.watch_provider.logo_path}
                  width={50}
                  height={50}
                  style={{ border: "1px  solid #555" }}
                />
              </React.Fragment>
            }
          />
        </FormGroup>
      </FormControl>
    </Grid>
  );
};

export default Watch_providers;

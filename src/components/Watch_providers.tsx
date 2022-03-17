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
  setOnClicked: React.Dispatch<React.SetStateAction<boolean>>;
  watch_provider: Result;
  watch_providersId : Result[];
  setWatchProviders: React.Dispatch<React.SetStateAction<Result[]>>
}

const Watch_providers = (props: Props) => {
  //   const [watchProviders, setWatchProviders] = useState<
  //     WatchProviders["results"]
  //   >([]);
  //   const [selected, setSelected] = useState<Array<boolean>>([false]);
  const [check, setCheck] = useState<boolean>(false);
  let path = "https://image.tmdb.org/t/p/original";
  

  const handleOnClicked = () => {
    setCheck(!check);
    props.setOnClicked(true);

    if (!props.watch_providersId.includes(props.watch_provider) == false) {
      
      let val = new Set(props.watch_providersId);
      val.delete(props.watch_provider);
      props.setWatchProviders(Array.from(val));
    } else {
     
      let val = new Set(props.watch_providersId);
      val.add(props.watch_provider);
      props.setWatchProviders(Array.from(val));
    }
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

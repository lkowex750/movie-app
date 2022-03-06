import React, { useEffect, useState } from "react";
import {
  Checkbox,
  FormControlLabel,
  FormControl,
  FormLabel,
  FormGroup,
  Box,
  Grid,
} from "@mui/material";
import { Genre } from "../interface/ResponseGenres";
type Props = {
  props: Genre;
  setOnClicked: React.Dispatch<React.SetStateAction<boolean>>;
  setGenresId: React.Dispatch<React.SetStateAction<Genre[]>>;
  genesId: Genre[];
};

const Genres = (value: Props) => {
 
  const [check, setCheck] = useState<boolean>(false);
  const handleOnClicked = () => {
    setCheck(!check);
    value.setOnClicked(true);
    if (!value.genesId.includes(value.props) == false) {
      let val = new Set(value.genesId);
      val.delete(value.props);
      value.setGenresId(Array.from(val));
    } else {
      let val = new Set(value.genesId);
      val.add(value.props);
      value.setGenresId(Array.from(val));
    }
  };

  return (
    <Grid item xs={6} md={4}>
      <FormControl component="fieldset" variant="standard">
        <FormGroup>
          <FormControlLabel
            control={<Checkbox checked={check} onClick={handleOnClicked} />}
            label={value.props.name}
          />
        </FormGroup>
      </FormControl>
    </Grid>
  );
};

export default Genres;

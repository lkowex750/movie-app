import React, { useState } from "react";
import {
  Checkbox,
  FormControlLabel,
  FormControl,
  FormLabel,
  FormGroup,
  Box,
} from "@mui/material";
type Props = {};

const Genres = (props: Props) => {
    const obj = {
        gilad: false,
        jason: false,
        antoine: false,
      }
      
  const [state, setState] = useState(obj);

  

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setState({
      ...state,
      [event.target.name]: event.target.checked,
    });
  };

  const { gilad, jason, antoine } = state;

  return (
    <Box sx={{ display: "flex" }}>
      <FormControl sx={{ m: 3 }} component="fieldset" variant="standard">
        <FormLabel component="legend">Genres</FormLabel>
        <FormGroup>
          <FormControlLabel
            control={<Checkbox checked={gilad} name="gilad" onChange={handleChange} />}
            label="Gilad Gray"
          />
          <FormControlLabel
            control={<Checkbox checked={jason} name="jason" onChange={handleChange}/>}
            label="Jason Killian"
          />
          <FormControlLabel
            control={<Checkbox checked={antoine} name="antoine" onChange={handleChange}/>}
            label="Antoine Llorca"
          />
          
        </FormGroup>
      </FormControl>
      
    </Box>
  );
};

export default Genres;

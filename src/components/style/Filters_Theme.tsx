import React from "react";
import { makeStyles, createStyles } from "@mui/styles";
import { Theme, createTheme } from "@mui/material";
import colors from "./color.json";
type Props = {};

const Filters_Theme = createTheme({
  palette: {
    primary: {
      main: colors.light_purple,
    },
  },
});

export default Filters_Theme;

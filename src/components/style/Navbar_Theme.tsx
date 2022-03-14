import React from "react";
import { makeStyles } from "@mui/styles";
import { Theme, createTheme } from "@mui/material";
import colors from "./color.json";

const Navbar_Theme = createTheme({
  palette: {
    primary: {
      main: colors.dark_blue,
    },
  },
});

export default Navbar_Theme;

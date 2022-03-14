import React from "react";
import { makeStyles, createStyles } from "@mui/styles";
import { Theme } from "@mui/material";
import colors from "./color.json";

const Home_Style = makeStyles((theme: Theme) =>
  createStyles({
    button_search: {
      cursor: "pointer",
      background: colors.light_blue,
    },
  })
);

export default Home_Style;

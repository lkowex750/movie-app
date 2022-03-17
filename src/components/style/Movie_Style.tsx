import React from "react";
import { makeStyles, createStyles } from "@mui/styles";
import { Theme } from "@mui/material";
import colors from "./color.json";

const Movie_Style = makeStyles((theme: Theme) =>
  createStyles({
    button_detail: {
      background: colors.fade_purple,
    },
    button_fav: {
      background: colors.fade_purple,
      padding: "10px 20px",
      border: "none",
      borderRadius: "5px",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      fontSize: "18px",
      fontWeight: "500",
      marginRight: "10px",
      cursor: "pointer",
    },
    card_fav_bg: {
      background: "primary",
      borderRadius: 0,
      boxShadow: "none",
    },
  })
);

export default Movie_Style;

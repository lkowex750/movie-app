import React from "react";
import LayOut from "../components/Layout";
import { Typography, Grid } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
type Props = {};

const PageNotFound = (props: Props) => {
  const navigate = useNavigate();
  const { t } = useTranslation();
  return (
    <LayOut>
      <Grid
        container
        direction="column"
        justifyContent="center"
        alignContent="center"
      >
        <Grid item >
          <Typography
            variant="h2"
            fontWeight={600}
            marginTop={10}
            marginBottom={5}
          >
            {t("not_fond")}
          </Typography>
          <img
            src="https://www.pngitem.com/pimgs/m/254-2549834_404-page-not-found-404-not-found-png.png"
            style={{ marginBottom: 20 }}
            onClick={() => {
              navigate("/");
            }}
          />
        </Grid>
      </Grid>
    </LayOut>
  );
};

export default PageNotFound;

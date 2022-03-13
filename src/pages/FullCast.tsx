import React, { useEffect, useState, useContext } from "react";
import LayOut from "../components/Layout";
import { useParams } from "react-router-dom";
import { Grid, Typography } from "@mui/material";
import { getCredits } from "../Api/api";
import { Credits } from "../interface/ResponseCastProps";
import LanguageContext from "../context/LanguageContext";
import CastList from "../components/CastList";
import CrewList from "../components/CrewList";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
type Props = {};

const FullCast = (props: Props) => {
  const { typeMovie, id } = useParams();
  const [credits, setCredits] = useState<Credits>();
  const { isLanguageIn } = useContext(LanguageContext);
  const { t } = useTranslation();
  const navigate = useNavigate();
  useEffect(() => {
    console.log(typeMovie);
    console.log(id);
    async function fetchGetCredits() {
      try {
        const data = await getCredits(
          Number(id),
          isLanguageIn,
          String(typeMovie)
        );
        console.log(data);
        setCredits(data);

        if (credits) {
          console.log(credits.cast);
          console.log(credits.crew);
        }
      } catch (error) {
        navigate("/*");
      }
    }
    fetchGetCredits();
  }, []);
  return (
    <LayOut>
      <Grid
        container
        spacing={3}
        direction="row"
        justifyContent="flex-start"
        alignItems="self-start"
      >
        <Grid item md={6}>
          <Typography marginBottom={3} fontWeight={600} fontSize={20}>
            {t("cast_props")}
          </Typography>
          {credits?.cast
            ? credits?.cast.map((cast, index) => {
                return <CastList key={index} cast={cast}></CastList>;
              })
            : null}
        </Grid>
        <Grid item md={6}>
          {credits?.crew.length !== 0 ? (
            <Typography marginBottom={3} fontWeight={600} fontSize={20}>
              {t("crew_props")}
            </Typography>
          ) : null}
          {credits?.crew
            ? credits.crew.map((crew, index) => {
                return <CrewList key={index} crew={crew}></CrewList>;
              })
            : null}
        </Grid>
      </Grid>
    </LayOut>
  );
};

export default FullCast;

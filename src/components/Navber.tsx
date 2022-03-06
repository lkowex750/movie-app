import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";
import {
  AppBar,
  Toolbar,
  useScrollTrigger,
  Slide,
  Button,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  SelectChangeEvent,
  Grid,
  Typography,
} from "@mui/material";
import LanguageContext from "../context/LanguageContext";
import RegionContext from "../context/RegionContext";
import PageContext from "../context/PageContext";


interface Prop {
  children: React.ReactElement;
}

const HideOnScroll = ({ children }: Prop) => {
  const trigger = useScrollTrigger();
  return (
    <Slide appear={false} direction={"down"} in={!trigger}>
      {children}
    </Slide>
  );
};

const Navber = () => {
  const { isLanguageIn, setIsLanguageIn } = useContext(LanguageContext);
  const { isRegionIn, setIsRegionIn } = useContext(RegionContext);
  const { setIsPageIn } = useContext(PageContext);
  const navigate = useNavigate();
  const setSelectedLanguage = (event: SelectChangeEvent) => {
    setIsLanguageIn(event.target.value as string);
  };
  const setSelectedRegion = (event: SelectChangeEvent) => {
    setIsRegionIn(event.target.value as string);
  };
  
  return (
    <HideOnScroll>
      <AppBar>
        <Toolbar>
          <Grid
            container
            spacing={1}
            direction="row"
            justifyContent="center"
            alignItems="center"
          >
            <Grid item sm={6} md={9} lg={10} xs={6}>
              <Button
                variant="text"
                style={{ color: "#FFF" }}
                href="/movie"
                onClick={() => {
                  setIsPageIn(1);
                }}
              >
                <Typography>Movie</Typography>
              </Button>
              <Button
                variant="text"
                style={{ color: "#FFF" }}
                onClick={() => {
                  navigate("/favorites");
                }}
              >
                <Typography>Favorites</Typography>
              </Button>
            </Grid>

            <Grid item>
              <FormControl size="small">
                <InputLabel
                  id="demo-simple-select-label"
                  style={{ color: "white" }}
                >
                  {"Region"}{" "}
                </InputLabel>
                <Select
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  value={isRegionIn}
                  label={isRegionIn}
                  style={{ color: "white" }}
                  onChange={setSelectedRegion}
                >
                  <MenuItem value={"US"}>US</MenuItem>
                  <MenuItem value={"TH"}>TH</MenuItem>
                  <MenuItem value={"CN"}>CN</MenuItem>
                  <MenuItem value={"JP"}>JP</MenuItem>
                </Select>
              </FormControl>
            </Grid>
            <Grid item>
              <FormControl size="small">
                <InputLabel
                  id="demo-simple-select-label"
                  style={{ color: "white" }}
                >
                  {"Lang"}
                </InputLabel>
                <Select
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  value={isLanguageIn}
                  label={isLanguageIn}
                  onChange={setSelectedLanguage}
                  style={{ color: "white" }}
                >
                  <MenuItem value={"en"}>EN</MenuItem>
                  <MenuItem value={"th"}>TH</MenuItem>
                  <MenuItem value={"cn"}>CN</MenuItem>
                  <MenuItem value={"jp"}>JP</MenuItem>
                </Select>
              </FormControl>
            </Grid>
          </Grid>
        </Toolbar>
      </AppBar>
    </HideOnScroll>
  );
};

export default Navber;

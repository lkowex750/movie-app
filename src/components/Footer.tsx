import React from "react";
import { Container, Box, Grid } from "@mui/material";
import { Link } from "react-router-dom";

type Props = {};

function Footer({}: Props) {
  return (
    <Box
      px={{ xs: 3, sm: 10 }}
      py={{ xs: 5, sm: 10 }}
      style={{ backgroundColor: "#757575" }}
      color="white"
    >
      <Container maxWidth="xl">
        <Grid container spacing={5}>
          <Grid item xs={12} sm={4}>
            <Box borderBottom={1}>Help</Box>
            <Box>
              <Link to={"/"} style={{ color: "white" }}>
                Contact
              </Link>
            </Box>
            <Box>
              <Link to={"/"} style={{ color: "white" }}>
                Support
              </Link>
            </Box>
            <Box>
              <Link to={"/"} style={{ color: "white" }}>
                Privacy
              </Link>
            </Box>
          </Grid>
          <Grid item xs={12} sm={4}>
            <Box borderBottom={1}>Test</Box>
            <Box>
              <Link to={"/"} style={{ color: "white" }}>
                Test
              </Link>
            </Box>
            <Box>
              <Link to={"/"} style={{ color: "white" }}>
                Test1
              </Link>
            </Box>
            <Box>
              <Link to={"/"} style={{ color: "white" }}>
                Test2
              </Link>
            </Box>
          </Grid>
          <Grid item xs={12} sm={4}>
            <Box borderBottom={1}>Hello</Box>
            <Box>
              <Link to={"/"} style={{ color: "white" }}>
                Test
              </Link>
            </Box>
            <Box>
              <Link to={"/"} style={{ color: "white" }}>
                Test1
              </Link>
            </Box>
            <Box>
              <Link to={"/"} style={{ color: "white" }}>
                Test2
              </Link>
            </Box>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
}

export default Footer;

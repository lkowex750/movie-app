import React from "react";
import Footer from "./Footer";
import Header from "./Header";
import { Container } from "@mui/material";
//import "../components/style/Layout.css";

type Props = {
  children: any;
};

function Layout({ children }: Props) {
  return (
    <>
      <Header />
      <br />
      <br />
      <br />
      <br />
      <Container maxWidth="lg">
        <main>{children}</main>
      </Container>

      <Footer />
    </>
  );
}

export default Layout;

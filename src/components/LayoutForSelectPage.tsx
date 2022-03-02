import React from "react";
import Footer from "./Footer";
import Header from "./Header";
import "./style/Layout.css";
import { Container } from "@mui/material";
type Props = {
  children: any;
};

function LayoutForSelectPage({ children }: Props) {
  return (
    <>
      <Header />
      <br />
      <br />
      <br />
      
        <main >{children}</main>
      
      <Footer />
    </>
  );
}

export default LayoutForSelectPage;

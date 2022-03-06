import React, { useContext } from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Favorites from "../pages/Favorites";
import Home from "../pages/Home";
import "./App.css";
import ContextProvider from "../context/ContextProvider";
import "../components/style/Layout.css";
import { Result } from "../interface/ResponseProps";
import MovieContext from "../context/MovieSelectedContext";
import MovieSelected from "../components/MovieSelected";
import { Container } from "@mui/material";


function App() {
  const { id, backdrop_path, title,release_date } = useContext(MovieContext);
  const pathMovieDetail = "/movie/" + id;
  return (
    <Container maxWidth="xl" className="bg-container">
      <ContextProvider>
        <BrowserRouter>
          <Routes>
            <Route index element={<Navigate to="/movie" />} />
            <Route path="/movie" element={<Home />} />
            <Route path="/favorites" element={<Favorites />} />
            <Route
              path="/movie/:id"
              element={
                <MovieSelected
                  id={id}
                  backdrop_path={backdrop_path}
                  title={title}
                  release_date={release_date}
                />
              }
            />
          </Routes>
        </BrowserRouter>
      </ContextProvider>
    </Container>
  );
}

export default App;

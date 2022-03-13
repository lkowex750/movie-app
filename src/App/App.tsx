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
import TvShows from "../pages/TvShows";
import FullCast from "../pages/FullCast";
import PageNotFound from "../pages/PageNotFound";

function App() {
  const { id, backdrop_path, title, release_date, typeMovie } =
    useContext(MovieContext);
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
              path="/:type/:id"
              element={
                <MovieSelected
                  id={id}
                  backdrop_path={backdrop_path}
                  title={title}
                  release_date={release_date}
                />
              }
            />
            <Route path="/tv" element={<TvShows />} />
            <Route path="/fullcast/:typeMovie/:id" element={<FullCast />} />
            <Route path="/*" element={<Navigate to="/404-not-found" />} />
            <Route
              path="/404-not-found"
              element={<PageNotFound></PageNotFound>}
            />
            <Route path="/favorites/*" element={<Navigate to="/*" />} />
          </Routes>
        </BrowserRouter>
      </ContextProvider>
    </Container>
  );
}

export default App;

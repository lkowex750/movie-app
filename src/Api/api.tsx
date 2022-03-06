import React from "react";
import axios from "axios";
import { PropsDiscover } from "../interface/RequestDiscover";

const api_path_pop = process.env.REACT_APP_API_PATH_POPULAR + "";
const api_path_movie_detail = process.env.REACT_APP_API_PATH_MOVIEDETAIL + "";
const api_path_discover_movie = process.env.REACT_APP_API_DISCOVER_MOVIE + "";
const api_path_list_genres = process.env.REACT_APP_API_LIST_GENRES + "";
const api_path_search_movie = process.env.REACT_APP_API_SEARCH_MOVIE + "";
const api_key = process.env.REACT_APP_API_KEY;

const languageObjActive = ["en", "th"];

export const getPopularMovie = async (
  page: number,
  language: string,
  region: string
) => {
  const getData = await axios
    .get(api_path_pop, {
      params: {
        api_key: api_key,
        page: page,
        language: language,
        region: region,
      },
    })
    .then((res) => res.data);
  return getData;
};

export const getMovieDetail = async (
  id: number,
  language: string,
  region: string
) => {
  const getData = await axios
    .get(api_path_movie_detail + id, {
      params: { api_key: api_key, language: language, region: region },
    })
    .then((res) => res.data);

  return getData;
};

export const getMoviesDiscover = async (
  page: number,
  language: string,
  region: string,
  sort_by: string,
  with_genres: string,
  include_adult: boolean
) => {
  if (sort_by === "") {
    sort_by = "popularity.desc";
  }

  const getData = await axios
    .get(api_path_discover_movie, {
      params: {
        api_key: api_key,
        language: language,
        page: page,
        region: region,
        sort_by: sort_by,
        with_genres: with_genres,
        include_adult: include_adult,
      },
    })
    .then((res) => res.data);
  return getData;
};

export const getListGenres = async (language: string) => {
  if (!(language === "en" || language === "th")) {
    language = "en";
  }

  const getData = await axios
    .get(api_path_list_genres, {
      params: { api_key: api_key, language: language },
    })
    .then((res) => res.data);

  return getData;
};

export const getSearchMovie = async (
  language: string,
  query: string,
  page: number,
  include_adult: boolean,
  region: string
) => {

  if(query=="" || query ===null){
    return null;
  }

  const getData = await axios
    .get(api_path_search_movie, {
      params: {
        api_key: api_key,
        language: language,
        query: query,
        page: page,
        include_adult: include_adult,
        region: region,
        year: null,
        primary_release_year: null
      },
    })
    .then((res) => res.data);



  return getData;
};

export default { getPopularMovie };

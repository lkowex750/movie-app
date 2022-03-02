import React from "react";
import axios from "axios";
import { PropsDiscover } from "../interface/RequestDiscover";

const api_path_pop = process.env.REACT_APP_API_PATH_POPULAR + "";
const api_path_movie_detail = process.env.REACT_APP_API_PATH_MOVIEDETAIL + "";
const api_path_discover_movie = process.env.REACT_APP_API_DISCOVER_MOVIE + "";
const api_key = process.env.REACT_APP_API_KEY;

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

export const getMoviesDiscover = async (page: number, language: string, region: string, sort_by: string) => {
  const getData = await axios
    .get(api_path_discover_movie, {
      params: {
        api_key: api_key,
        language: language,
        page: page,
        region: region,
        sort_by: sort_by,
      },
    })
    .then((res) => res.data);
  return getData;
};

export default { getPopularMovie };

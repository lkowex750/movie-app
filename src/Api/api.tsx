import React from "react";
import axios from "axios";

const api_path_pop = process.env.REACT_APP_API_PATH_POPULAR + "";
const api_path_movie_detail = process.env.REACT_APP_API_PATH_MOVIEDETAIL + "";
const api_path_discover_movie = process.env.REACT_APP_API_DISCOVER_MOVIE + "";
const api_path_list_genres = process.env.REACT_APP_API_LIST_GENRES + "";
const api_path_list_genres_tv = process.env.REACT_APP_API_LIST_GENRES_TV + "";
const api_path_search_movie = process.env.REACT_APP_API_SEARCH_MOVIE + "";
const api_path_pop_tv = process.env.REACT_APP_API_PATH_POPULAR_TV + "";
const api_path_tv_detail = process.env.REACT_APP_API_PATH_DETAIL_TV + "";
const api_path_discover_tv = process.env.REACT_APP_API_DISCOVER_TV + "";
const api_path_search_tv = process.env.REACT_APP_API_SEARCH_TV + "";
const api_path_movie_watchproviders =
  process.env.REACT_APP_API_WATCH_PROVIDERS_MOVIE + "";
const api_path_tv_watchproviders =
  process.env.REACT_APP_API_WATCH_PROVIDERS_TV + "";
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

export const getMoviesDiscover = async (
  page: number,
  language: string,
  region: string,
  sort_by: string,
  with_genres: string,
  include_adult: boolean,
  dateFilter: Array<string>,
  with_watch_providers : string
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
        "primary_release_date.gte": dateFilter[0],
        "primary_release_date.lte": dateFilter[1],
        with_watch_providers: with_watch_providers,
        watch_region: "TH"
      },
    })
    .then((res) => res.data);
  return getData;
};

export const getListGenres = async (language: string, type: string) => {
  if (!(language === "en" || language === "th")) {
    language = "en";
  }
  let pathApi = "";
  if (type === "movie") {
    pathApi = api_path_list_genres;
  } else {
    pathApi = api_path_list_genres_tv;
  }

  const getData = await axios
    .get(pathApi, {
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
  if (query == "" || query === null) {
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
        primary_release_year: null,
      },
    })
    .then((res) => res.data);

  return getData;
};

export const getMovieTvPop = async (page: number, language: string) => {
  const getData = await axios
    .get(api_path_pop_tv, {
      params: { api_key: api_key, language: language, page: page },
    })
    .then((res) => res.data);

  return getData;
};

export const getMovieDetailTv = async (id: number, language: string) => {
  const getData = await axios
    .get(api_path_tv_detail + id, {
      params: { api_key: api_key, language: language },
    })
    .then((res) => res.data);

  return getData;
};

export const getTvDiscover = async (
  page: number,
  language: string,
  region: string,
  sort_by: string,
  with_genres: string,
  dateFilter: Array<string>,
  with_watch_providers : string
) => {
  if (sort_by === "") {
    sort_by = "popularity.desc";
  }
  const getData = await axios
    .get(api_path_discover_tv, {
      params: {
        api_key: api_key,
        language: language,
        sort_by: sort_by,
        page: page,
        with_genres: with_genres,
        "first_air_date.gte": dateFilter[0],
        "first_air_date.lte": dateFilter[1],
        with_watch_providers: with_watch_providers,
        watch_region : "TH"
      },
    })
    .then((res) => res.data);

  return getData;
};

export const getSearchTvs = async (
  language: string,
  query: string,
  page: number,
  include_adult: boolean
) => {
  if (query == "" || query === null) {
    return null;
  }
  const getData = await axios
    .get(api_path_search_tv, {
      params: {
        api_key: api_key,
        language: language,
        page: page,
        query: query,
        include_adult: include_adult,
      },
    })
    .then((res) => res.data);

  return getData;
};

export const getCredits = async (
  id: number,
  language: string,
  typeMovie: string
) => {
  const getData = await axios
    .get(
      "https://api.themoviedb.org/3/" +
        (typeMovie === "movie" ? "movie/" : "tv/") +
        id +
        "/credits",
      {
        params: {
          api_key: api_key,
          language: language,
        },
      }
    )
    .then((res) => res.data);

  return getData;
};

export const getMovieReviews = async (
  id: number,
  language: string,
  typeMovie: string
) => {
  const getData = await axios
    .get(
      "https://api.themoviedb.org/3/" +
        (typeMovie === "movie" ? "movie/" : "tv/") +
        id +
        "/reviews",
      {
        params: {
          api_key: api_key,
          language: language,
          page: 1,
        },
      }
    )
    .then((res) => res.data);

  return getData;
};

export const getMovieProviders = async (language: string) => {
  const getData = await axios.get(api_path_movie_watchproviders, {
    params: { api_key: api_key, language: language ,watch_region: "TH"},
  }).then((res) => res.data);

  return getData;
};

export const getTvProviders = async (language : string) => {
  const getData = await axios.get(api_path_tv_watchproviders, {
    params: { api_key: api_key, language: language ,watch_region: "TH"},
  }).then((res) => res.data);

  return getData;
};

export default { getPopularMovie };

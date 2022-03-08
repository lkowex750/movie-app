import React, { createContext, useEffect, useState } from "react";

type MovieDetailProps = {
  id: number;
  backdrop_path: string;
  title: string;
  release_date : string;
  typeMovie : string;
  setId: React.Dispatch<React.SetStateAction<number>>;
  setBackdrop_path: React.Dispatch<React.SetStateAction<string>>;
  setTitle: React.Dispatch<React.SetStateAction<string>>;
  setRelease_date: React.Dispatch<React.SetStateAction<string>>;
  setTypeMovie : React.Dispatch<React.SetStateAction<string>>
};

const MovieContext = createContext({} as MovieDetailProps);
export const MovieProvider: React.FC = (props) => {
  const idKey = "id";
  const backdropKey = "backdrop_path";
  const titleKey = "title";
  const releaseDateKey = "release_date";
  const typeMovieKey = "typeMovie";

  const idSesion = sessionStorage.getItem(idKey);
  const backdropSesion = sessionStorage.getItem(backdropKey);
  const titleSesion = sessionStorage.getItem(titleKey);
  const releaseDateSesion = sessionStorage.getItem(releaseDateKey);
  const typeMovieSesion = sessionStorage.getItem(typeMovieKey);

  const [id, setId] = useState<number>(idSesion ? JSON.parse(idSesion) : false);
  const [backdrop_path, setBackdrop_path] = useState<string>(
    backdropSesion ? JSON.parse(backdropSesion) : false
  );
  const [title, setTitle] = useState<string>(
    titleSesion ? JSON.parse(titleSesion) : false
  );
  const [release_date, setRelease_date] = useState<string>(
    releaseDateSesion ? JSON.parse(releaseDateSesion) : false
  );
  const [typeMovie, setTypeMovie] = useState<string>(typeMovieSesion ? JSON.parse(typeMovieSesion) : "");

  useEffect(() => {
    sessionStorage.setItem(idKey, JSON.stringify(id));
  }, [id]);

  useEffect(() => {
    sessionStorage.setItem(backdropKey, JSON.stringify(backdrop_path));
  }, [backdrop_path]);

  useEffect(() => {
    sessionStorage.setItem(titleKey, JSON.stringify(title));
  }, [title]);

  useEffect(() => {
    sessionStorage.setItem(releaseDateKey, JSON.stringify(release_date));
  }, [release_date]);

  useEffect(() => {
    sessionStorage.setItem(typeMovieKey, JSON.stringify(typeMovie));
  }, [release_date]);

  return (
    <MovieContext.Provider
      value={{ id, backdrop_path, title,release_date,typeMovie, setId, setBackdrop_path, setTitle,setRelease_date,setTypeMovie }}
    >
      {props.children}
    </MovieContext.Provider>
  );
};
export default MovieContext;

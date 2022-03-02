import React, { createContext, useEffect, useState } from "react";

type MovieDetailProps = {
  id: number;
  backdrop_path: string;
  title: string;
  release_date : string;
  setId: React.Dispatch<React.SetStateAction<number>>;
  setBackdrop_path: React.Dispatch<React.SetStateAction<string>>;
  setTitle: React.Dispatch<React.SetStateAction<string>>;
  setRelease_date: React.Dispatch<React.SetStateAction<string>>;
};

const MovieContext = createContext({} as MovieDetailProps);
export const MovieProvider: React.FC = (props) => {
  const idKey = "id";
  const backdropKey = "backdrop_path";
  const titleKey = "title";
  const releaseDateKey = "release_date"

  const idSesion = sessionStorage.getItem(idKey);
  const backdropSesion = sessionStorage.getItem(backdropKey);
  const titleSesion = sessionStorage.getItem(titleKey);
  const releaseDateSesion = sessionStorage.getItem(releaseDateKey);

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

  return (
    <MovieContext.Provider
      value={{ id, backdrop_path, title,release_date, setId, setBackdrop_path, setTitle,setRelease_date }}
    >
      {props.children}
    </MovieContext.Provider>
  );
};
export default MovieContext;

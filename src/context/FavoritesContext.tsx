import React, { createContext, useEffect, useState } from "react";
import {FavProps} from "../interface/FavInterface"
type FavoiritesContextProps = {
  isFavoiritesIn: Array<FavProps>;
  setIsFavoiritesIn: React.Dispatch<React.SetStateAction<Array<FavProps>>>;
};

const FavoiritesContext = createContext({} as FavoiritesContextProps);

export const FavoiritesProvider: React.FC = (props) => {
  const isFavoiritesKey = "isFavoiritesIn";

  const isFavoiritesInLocal = localStorage.getItem(isFavoiritesKey);

  const [isFavoiritesIn, setIsFavoiritesIn] = useState<Array<FavProps>>(
    isFavoiritesInLocal ? JSON.parse(isFavoiritesInLocal) : []
  );

  useEffect(() => {
    localStorage.setItem(isFavoiritesKey, JSON.stringify(isFavoiritesIn));
  }, [isFavoiritesIn]);

  return (
    <FavoiritesContext.Provider value={{ isFavoiritesIn, setIsFavoiritesIn }}>
      {props.children}
    </FavoiritesContext.Provider>
  );
};
export default FavoiritesContext;

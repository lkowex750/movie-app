import React, { createContext, useEffect, useState } from "react";

type LanguageContextProps = {
  isLanguageIn: string;
  setIsLanguageIn: React.Dispatch<React.SetStateAction<string>>;
};

const LanguageContext = createContext({} as LanguageContextProps);

export const LanguageProvider: React.FC = (props) => {
  const isLanguageKey = "isLanguageIn";

  const isLanguageInLocal = localStorage.getItem(isLanguageKey);

  const [isLanguageIn, setIsLanguageIn] = useState<string>(
    isLanguageInLocal ? JSON.parse(isLanguageInLocal) : "en"
  );

  useEffect(() => {
    localStorage.setItem(isLanguageKey, JSON.stringify(isLanguageIn));
  }, [isLanguageIn]);

  return (
    <LanguageContext.Provider value={{ isLanguageIn, setIsLanguageIn }}>
      {props.children}
    </LanguageContext.Provider>
  );
};
export default LanguageContext;

import React, { createContext, useEffect, useState } from "react";
import {ThemeProps} from "../interface/ThemeInterface"
type ThemeContextProps = {
  themeMode: boolean;
  setThemeMode: React.Dispatch<React.SetStateAction<boolean>>;
};

const ThemeContext = createContext({} as ThemeContextProps);

export const ThemeModeProvider: React.FC = (props) => {
  const isThemeKey = "themeModeKey";

  const isThemeInLocal = localStorage.getItem(isThemeKey);

  const [themeMode, setThemeMode] = useState<boolean>(
    isThemeInLocal ? JSON.parse(isThemeInLocal) : false
  );

  useEffect(() => {
    localStorage.setItem(isThemeKey, JSON.stringify(themeMode));
  }, [themeMode]);

  return (
    <ThemeContext.Provider value={{ themeMode, setThemeMode }}>
      {props.children}
    </ThemeContext.Provider>
  );
};
export default ThemeContext;

import React, { createContext, useEffect, useState } from "react";

type RegionContextProps = {
  isRegionIn: string;
  setIsRegionIn: React.Dispatch<React.SetStateAction<string>>;
};

const RegionContext = createContext({} as RegionContextProps);

export const RegionProvider: React.FC = (props) => {
  const isRegionKey = "isRegionIn";

  const isRegionInLocal = localStorage.getItem(isRegionKey);

  const [isRegionIn, setIsRegionIn] = useState<string>(
    isRegionInLocal ? JSON.parse(isRegionInLocal) : "US"
  );

  useEffect(() => {
    localStorage.setItem(isRegionKey, JSON.stringify(isRegionIn));
  }, [isRegionIn]);

  return (
    <RegionContext.Provider value={{ isRegionIn, setIsRegionIn }}>
      {props.children}
    </RegionContext.Provider>
  );
};
export default RegionContext;

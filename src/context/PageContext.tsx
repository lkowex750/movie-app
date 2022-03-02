import React, { createContext, useEffect, useState } from "react";

type PageContextProps = {
  isPageIn: number;
  setIsPageIn: React.Dispatch<React.SetStateAction<number>>;
};

const PageContext = createContext({} as PageContextProps);

export const PageProvider: React.FC = (props) => {
  const isPageKey = "isPageIn";

  const isPageInSession = sessionStorage.getItem(isPageKey);

  const [isPageIn, setIsPageIn] = useState<number>(
    isPageInSession ? JSON.parse(isPageInSession) : 1
  );

  useEffect(() => {
  sessionStorage.setItem(isPageKey, JSON.stringify(isPageIn));
  }, [isPageIn]);

  return (
    <PageContext.Provider value={{ isPageIn, setIsPageIn }}>
      {props.children}
    </PageContext.Provider>
  );
};
export default PageContext;

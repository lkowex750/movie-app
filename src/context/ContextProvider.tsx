import React from "react";

import { LanguageProvider } from "./LanguageContext";
import { MovieProvider } from "./MovieSelectedContext";
import { RegionProvider } from "./RegionContext";
import { PageProvider } from "./PageContext";
const providers = [
  LanguageProvider,
  MovieProvider,
  RegionProvider,
  PageProvider,
];

const ContextProvider = (...components: React.FC[]): React.FC =>
  components.reduce(
    (AccumComponents, Component) =>
      ({ children }): JSX.Element =>
        (
          <AccumComponents>
            <Component>{children}</Component>
          </AccumComponents>
        ),
    ({ children }) => <>{children}</>
  );

export default ContextProvider(...providers);

import React from "react";
import logo from "./logo.svg";
import "./App.css";
import {
  SingleEliminationBracket,
  Match,
  SVGViewer,
} from "@g-loot/react-tournament-brackets";
import { simpleSmallBracket } from "./bracket-data";

function App() {
  return (
    <div className="" style={{ backgroundColor: "black" }}>
      <SingleEliminationBracket
        matches={simpleSmallBracket}
        matchComponent={Match}
        svgWrapper={({ children, ...props }) => (
          <SVGViewer width={1000} height={1700} {...props}>
            {children}
          </SVGViewer>
        )}
      />
    </div>
  );
}

export default App;

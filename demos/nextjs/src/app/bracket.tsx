"use client"; // This is a client component 👈🏽

import {
  SingleEliminationBracket,
  Match,
  SVGViewer,
} from "@g-loot/react-tournament-brackets";
import { simpleSmallBracket } from "./bracket-data";

export default function Bracket() {
  return (
    <SingleEliminationBracket
      matches={simpleSmallBracket}
      matchComponent={Match}
      svgWrapper={({ children, ...props }) => (
        <SVGViewer width={1000} height={1700} {...props}>
          {children}
        </SVGViewer>
      )}
    />
  );
}

import React from 'react';
// also exported from '@storybook/react' if you can deal with breaking changes in 6.1

import useWindowSize from 'Hooks/use-window-size';
import styled from 'styled-components';
import Match from 'Components/match';
import noPartyMockData from '../mock-data/data-double-no-show';
import lastGameInLowerMockData from '../mock-data/data-double-last-game-lower';
import lastGameInUpperMockData from '../mock-data/data-double-last-game-upper-double-playoffs';
import DoubleElimBracketLeaderboard from './double-elim-bracket';
import SvgViewer from '../svg-viewer';
import simpleDoubleFull from '../mock-data/simple-double-full';
import simpleDouble from '../mock-data/simple-data-double';

export default {
  title: 'Components/DoubleElim',
  component: DoubleElimBracketLeaderboard,
};

const StyledSvgViewer = styled(SvgViewer).attrs(props => {
  return {
    background: props.theme.canvasBackground,
    SVGBackground: props.theme.canvasBackground,
  };
})``;

export function DoubleElimination() {
  const [width, height] = useWindowSize();
  const finalWidth = Math.max(width - 50, 500);
  const finalHeight = Math.max(height - 100, 500);
  return (
    <DoubleElimBracketLeaderboard
      matches={simpleDoubleFull}
      matchComponent={Match}
      svgWrapper={({ children, ...props }) => (
        <StyledSvgViewer width={finalWidth} height={finalHeight} {...props}>
          {children}
        </StyledSvgViewer>
      )}
    />
  );
}

export function DoubleEliminationBig() {
  const [width, height] = useWindowSize();
  const finalWidth = Math.max(width - 50, 500);
  const finalHeight = Math.max(height - 100, 500);
  return (
    <DoubleElimBracketLeaderboard
      matches={simpleDouble}
      matchComponent={Match}
      svgWrapper={({ children, ...props }) => (
        <StyledSvgViewer width={finalWidth} height={finalHeight} {...props}>
          {children}
        </StyledSvgViewer>
      )}
    />
  );
}

export function DoubleEliminationNoParty() {
  const [width, height] = useWindowSize();
  const finalWidth = Math.max(width - 50, 500);
  const finalHeight = Math.max(height - 100, 500);
  return (
    <DoubleElimBracketLeaderboard
      matches={noPartyMockData}
      matchComponent={Match}
      svgWrapper={({ children, ...props }) => (
        <StyledSvgViewer width={finalWidth} height={finalHeight} {...props}>
          {children}
        </StyledSvgViewer>
      )}
    />
  );
}

export function DoubleEliminationDoubleFinalsLastGamesInLower() {
  const [width, height] = useWindowSize();
  const finalWidth = Math.max(width - 50, 500);
  const finalHeight = Math.max(height - 100, 500);
  return (
    <DoubleElimBracketLeaderboard
      matches={lastGameInLowerMockData}
      matchComponent={Match}
      svgWrapper={({ children, ...props }) => (
        <StyledSvgViewer width={finalWidth} height={finalHeight} {...props}>
          {children}
        </StyledSvgViewer>
      )}
    />
  );
}
export function DoubleEliminationDoubleFinalsLastGamesInUpper() {
  const [width, height] = useWindowSize();
  const finalWidth = Math.max(width - 50, 500);
  const finalHeight = Math.max(height - 100, 500);
  return (
    <DoubleElimBracketLeaderboard
      matches={lastGameInUpperMockData}
      matchComponent={Match}
      svgWrapper={({ children, ...props }) => (
        <StyledSvgViewer width={finalWidth} height={finalHeight} {...props}>
          {children}
        </StyledSvgViewer>
      )}
    />
  );
}

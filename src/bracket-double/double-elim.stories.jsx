import React from 'react';
// also exported from '@storybook/react' if you can deal with breaking changes in 6.1

import useWindowSize from 'Hooks/use-window-size';
import styled from 'styled-components';
import Match from 'Components/match';
import DoubleElimBracketLeaderboard from './double-elim-bracket';
import SvgViewer from '../svg-viewer';
import { simpleDoubleFull } from '../mock-data/simple-double-full';
import { simpleDouble } from '../mock-data/simple-data-double';

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

export const DoubleElimination = () => {
  const [width, height] = useWindowSize();
  const finalWidth = Math.max(width - 50, 500);
  const finalHeight = Math.max(height - 100, 500);
  return (
    <>
      <DoubleElimBracketLeaderboard
        matches={simpleDoubleFull}
        matchComponent={Match}
        svgWrapper={({ children, ...props }) => (
          <StyledSvgViewer width={finalWidth} height={finalHeight} {...props}>
            {children}
          </StyledSvgViewer>
        )}
      />
    </>
  );
};

export const DoubleEliminationBig = () => {
  const [width, height] = useWindowSize();
  const finalWidth = Math.max(width - 50, 500);
  const finalHeight = Math.max(height - 100, 500);
  return (
    <>
      <DoubleElimBracketLeaderboard
        matches={simpleDouble}
        matchComponent={Match}
        svgWrapper={({ children, ...props }) => (
          <StyledSvgViewer width={finalWidth} height={finalHeight} {...props}>
            {children}
          </StyledSvgViewer>
        )}
      />
    </>
  );
};

import React from 'react';
// also exported from '@storybook/react' if you can deal with breaking changes in 6.1

import useWindowSize from 'Hooks/use-window-size';
import BracketLeaderboard from './index';
import SvgViewer from '../svg-viewer';
import {
  walkOverData,
  simpleBracket,
  simpleSmallBracket,
} from './mock-data/simple-data';
import styled from 'styled-components';

export default {
  title: 'Components/Bracket',
  component: BracketLeaderboard,
};

const StyledSvgViewer = styled(SvgViewer).attrs(props => {
  return {
    background: props.theme.darkCanvas2,
    SVGBackground: props.theme.darkCanvas2,
  };
})``;

const Template = ({ ...args }) => {
  const [width, height] = useWindowSize();
  const finalWidth = Math.max(width - 50, 500);
  const finalHeight = Math.max(height - 100, 500);
  return (
    <BracketLeaderboard
      // currentRound={4}
      svgWrapper={({ children, ...props }) => (
        <StyledSvgViewer width={finalWidth} height={finalHeight} {...props}>
          {children}
        </StyledSvgViewer>
      )}
      {...args}
    />
  );
};

export const Bracket = Template.bind({});
Bracket.args = {
  matches: simpleBracket,
};
export const SmallBracket = Template.bind({});
SmallBracket.args = {
  matches: simpleSmallBracket,
};
export const WalkOverBracket = Template.bind({});
WalkOverBracket.args = {
  matches: walkOverData,
};
export const CustomMatchViewBracket = Template.bind({});
CustomMatchViewBracket.args = {
  matches: simpleBracket,
  matchComponent: ({
    match,
    onMatchClick,
    onPartyClick,
    onMouseEnter,
    onMouseLeave,
    topParty,
    bottomParty,
    topWon,
    bottomWon,
    topHovered,
    bottomHovered,
    topText,
    bottomText,
    connectorColor,
    computedStyles,
  }) => (
    <div>
      <div />
      <div />
    </div>
  ),
};

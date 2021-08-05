import React from 'react';
import Connector from 'Components/connector';
import { getCalculatedStyles } from '../settings';
import {
  calculatePositionOfMatchUpperBracket,
  calculatePositionOfMatchLowerBracket,
  calculatePositionOfFinalGame,
} from './calculate-match-position';

const FinalConnectors = ({
  rowIndex,
  columnIndex,

  style,
  bracketSnippet = null,
  offsetY = 0,
  numOfUpperRounds,
  numOfLowerRounds,
  lowerBracketHeight,
  upperBracketHeight,
  gameHeight,
}) => {
  const { columnWidth, rowHeight, canvasPadding } = getCalculatedStyles(style);

  const currentMatchPosition = calculatePositionOfFinalGame(
    rowIndex,
    columnIndex,
    {
      canvasPadding,
      rowHeight,
      columnWidth,
      offsetY,
      lowerBracketHeight,
      upperBracketHeight,
      gameHeight,
    }
  );
  const previousTopMatchPosition = calculatePositionOfMatchUpperBracket(
    0,
    numOfUpperRounds - 1, // numOfRounds is higher than index by 1 and we need 2nd to last index
    {
      canvasPadding,
      rowHeight,
      columnWidth,
      offsetY,
    }
  );

  const previousBottomMatchPosition = calculatePositionOfMatchLowerBracket(
    0,
    numOfLowerRounds - 1, // numOfRounds is higher than index by 1 and we need 2nd to last index
    {
      canvasPadding,
      rowHeight,
      columnWidth,
      offsetY: upperBracketHeight + offsetY,
    }
  );

  return (
    <Connector
      bracketSnippet={bracketSnippet}
      previousBottomMatchPosition={previousBottomMatchPosition}
      previousTopMatchPosition={previousTopMatchPosition}
      currentMatchPosition={currentMatchPosition}
      style={style}
    />
  );
};

export default FinalConnectors;

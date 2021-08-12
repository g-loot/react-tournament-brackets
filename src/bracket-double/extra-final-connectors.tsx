import React from 'react';
import Connector from 'Components/connector';
import { getCalculatedStyles } from '../settings';
import { calculatePositionOfFinalGame } from './calculate-match-position';

const FinalConnectors = ({
  rowIndex,
  columnIndex,

  style,
  bracketSnippet = null,
  offsetY = 0,
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

  const previousBottomMatchPosition = calculatePositionOfFinalGame(
    0,
    numOfLowerRounds, // numOfRounds is higher than index by 1 and we need 2nd to last index
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

  return (
    <Connector
      bracketSnippet={bracketSnippet}
      previousBottomMatchPosition={previousBottomMatchPosition}
      currentMatchPosition={currentMatchPosition}
      style={style}
    />
  );
};

export default FinalConnectors;

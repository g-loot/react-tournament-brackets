import React from 'react';
import Connector from 'Components/connector';

import { getCalculatedStyles } from '../settings';
import {
  calculatePositionOfMatchUpperBracket,
  calculatePositionOfMatchLowerBracket,
} from './calculate-match-position';

const Connectors = ({
  bracketSnippet,
  rowIndex,
  columnIndex,
  style,
  offsetY = 0,
  isLowerBracket = false,
}) => {
  const { columnWidth, rowHeight, canvasPadding } = getCalculatedStyles(style);

  const isUpperSeedingRound = isLowerBracket && columnIndex % 2 !== 0;
  const positioningFunction = isLowerBracket
    ? calculatePositionOfMatchLowerBracket
    : calculatePositionOfMatchUpperBracket;
  const currentMatchPosition = positioningFunction(rowIndex, columnIndex, {
    canvasPadding,
    rowHeight,
    columnWidth,
    offsetY,
  });
  const previousBottomPosition = isUpperSeedingRound
    ? rowIndex
    : (rowIndex + 1) * 2 - 1;
  const previousTopMatchPosition =
    !isUpperSeedingRound &&
    positioningFunction(previousBottomPosition - 1, columnIndex - 1, {
      canvasPadding,
      rowHeight,
      columnWidth,
      offsetY,
    });
  const previousBottomMatchPosition = positioningFunction(
    previousBottomPosition,
    columnIndex - 1,
    {
      canvasPadding,
      rowHeight,
      columnWidth,
      offsetY,
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

export default Connectors;

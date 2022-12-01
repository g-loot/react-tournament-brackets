import React from 'react';

import Connector from 'Components/connector';
import { getCalculatedStyles } from '../settings';
import { calculatePositionOfMatch } from './calculate-match-position';

const Connectors = ({
  bracketSnippet,
  rowIndex,
  columnIndex,
  style,
  offsetY = 0,
}) => {
  const {
    columnWidth,

    rowHeight,
    canvasPadding,
  } = getCalculatedStyles(style);

  const currentMatchPosition = calculatePositionOfMatch(rowIndex, columnIndex, {
    canvasPadding,
    rowHeight,
    columnWidth,
    offsetY,
  });
  const previousBottomPosition = (rowIndex + 1) * 2 - 1;
  const previousTopMatchPosition =
    bracketSnippet.previousTopMatch &&
    calculatePositionOfMatch(previousBottomPosition - 1, columnIndex - 1, {
      canvasPadding,
      rowHeight,
      columnWidth,
      offsetY,
    });
  const previousBottomMatchPosition =
    bracketSnippet.previousBottomMatch &&
    calculatePositionOfMatch(previousBottomPosition, columnIndex - 1, {
      canvasPadding,
      rowHeight,
      columnWidth,
      offsetY,
    });

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

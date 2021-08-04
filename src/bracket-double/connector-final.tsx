import React, { useContext } from 'react';
import { matchContext } from '../core/match-context';
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
  const {
    columnWidth,
    boxHeight,
    rowHeight,
    canvasPadding,
    connectorColor,
    roundHeader,
    roundSeparatorWidth,
    lineInfo,
    horizontalOffset,
    connectorColorHighlight,
    width,
  } = getCalculatedStyles(style);

  const { x, y } = calculatePositionOfFinalGame(rowIndex, columnIndex, {
    canvasPadding,
    rowHeight,
    columnWidth,
    offsetY,
    lowerBracketHeight,
    upperBracketHeight,
    gameHeight,
  });
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

  const pathInfo = multiplier => {
    const middlePointOfMatchComponent = boxHeight / 2;
    const previousMatch =
      multiplier > 0 ? previousBottomMatchPosition : previousTopMatchPosition;
    const startPoint = `${x - horizontalOffset - lineInfo.separation} ${
      y +
      lineInfo.homeVisitorSpread * multiplier +
      middlePointOfMatchComponent +
      (roundHeader.isShown ? roundHeader.height + roundHeader.marginBottom : 0)
    }`;
    const horizontalWidthLeft = x - roundSeparatorWidth / 2 - horizontalOffset;

    const verticalHeight =
      previousMatch.y +
      middlePointOfMatchComponent +
      (roundHeader.isShown ? roundHeader.height + roundHeader.marginBottom : 0);
    const horizontalWidthRight = previousMatch.x + width;
    return [
      `M${startPoint}`,
      `H${horizontalWidthLeft}`,
      `V${verticalHeight}`,
      `H${horizontalWidthRight}`,
    ];
  };

  const {
    state: { hoveredPartyId },
  } = useContext(matchContext);
  const previousTopMatch = bracketSnippet?.previousTopMatch;

  const previousBottomMatch = bracketSnippet?.previousBottomMatch;

  const currentMatch = bracketSnippet?.currentMatch;

  const topHighlighted =
    currentMatch.participants?.some(p => p.id === hoveredPartyId) &&
    previousTopMatch.participants?.some(p => p.id === hoveredPartyId);

  const bottomHighlighted =
    currentMatch.participants?.some(p => p.id === hoveredPartyId) &&
    previousBottomMatch.participants?.some(p => p.id === hoveredPartyId);

  return (
    <>
      <path
        d={pathInfo(-1).join(' ')}
        id={`connector-${rowIndex}-${columnIndex}-${-1}`}
        fill="transparent"
        stroke={topHighlighted ? connectorColorHighlight : connectorColor}
      />

      <path
        d={pathInfo(1).join(' ')}
        id={`connector-${rowIndex}-${columnIndex}-${1}`}
        fill="transparent"
        stroke={bottomHighlighted ? connectorColorHighlight : connectorColor}
      />

      {topHighlighted && (
        <use href={`connector-${rowIndex}-${columnIndex}-${-1}`} />
      )}
      {bottomHighlighted && (
        <use href={`connector-${rowIndex}-${columnIndex}-${1}`} />
      )}
    </>
  );
};

export default FinalConnectors;

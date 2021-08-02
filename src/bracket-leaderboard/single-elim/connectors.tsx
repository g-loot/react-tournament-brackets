import React, { useContext } from 'react';
import { matchContext } from '../match-context';
import { getCalculatedStyles } from '../settings';
import { calculatePositionOfMatch } from './calculate-match-position';

const Connectors = ({
  rowIndex,
  columnIndex,
  columns,
  style,
  bracketSnippet = null,
  offsetY = 0,
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
  } = getCalculatedStyles(style);

  const { x, y } = calculatePositionOfMatch(rowIndex, columnIndex, {
    canvasPadding,
    rowHeight,
    columnWidth,
    offsetY,
  });
  const previousBottomPosition = (rowIndex + 1) * 2 - 1;
  const previousTopMatchPosition = calculatePositionOfMatch(
    previousBottomPosition - 1,
    columnIndex - 1,
    {
      canvasPadding,
      rowHeight,
      columnWidth,
      offsetY,
    }
  );
  const previousBottomMatchPosition = calculatePositionOfMatch(
    previousBottomPosition,
    columnIndex - 1,
    {
      canvasPadding,
      rowHeight,
      columnWidth,
      offsetY,
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
    const horizontalWidthRight =
      x - roundSeparatorWidth + lineInfo.separation - horizontalOffset;

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
  const previousTopMatch =
    bracketSnippet?.previousTopMatch ||
    columns[columnIndex - 1][previousBottomPosition - 1];
  const previousBottomMatch =
    bracketSnippet?.previousBottomMatch ||
    columns[columnIndex - 1][previousBottomPosition];
  const currentMatch =
    bracketSnippet?.currentMatch || columns[columnIndex][rowIndex];

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

export default Connectors;

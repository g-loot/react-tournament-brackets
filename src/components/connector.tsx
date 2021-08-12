import useMatchHighlightContext from 'Hooks/use-match-highlight';
import React from 'react';
import { getCalculatedStyles } from '../settings';

const Connector = ({
  bracketSnippet,
  previousBottomMatchPosition = null,
  previousTopMatchPosition = null,
  currentMatchPosition,
  style,
}) => {
  const {
    boxHeight,
    connectorColor,
    roundHeader,
    roundSeparatorWidth,
    lineInfo,
    horizontalOffset,
    connectorColorHighlight,
    width,
  } = getCalculatedStyles(style);

  const pathInfo = multiplier => {
    const middlePointOfMatchComponent = boxHeight / 2;
    const previousMatch =
      multiplier > 0 ? previousBottomMatchPosition : previousTopMatchPosition;
    const startPoint = `${
      currentMatchPosition.x - horizontalOffset - lineInfo.separation
    } ${
      currentMatchPosition.y +
      lineInfo.homeVisitorSpread * multiplier +
      middlePointOfMatchComponent +
      (roundHeader.isShown ? roundHeader.height + roundHeader.marginBottom : 0)
    }`;
    const horizontalWidthLeft =
      currentMatchPosition.x - roundSeparatorWidth / 2 - horizontalOffset;

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

  const { topHighlighted, bottomHighlighted } = useMatchHighlightContext({
    bracketSnippet,
  });

  const { x, y } = currentMatchPosition;
  return (
    <>
      {previousTopMatchPosition && (
        <path
          d={pathInfo(-1).join(' ')}
          id={`connector-${x}-${y}-${-1}`}
          fill="transparent"
          stroke={topHighlighted ? connectorColorHighlight : connectorColor}
        />
      )}
      {previousBottomMatchPosition && (
        <path
          d={pathInfo(1).join(' ')}
          id={`connector-${x}-${y}-${1}`}
          fill="transparent"
          stroke={bottomHighlighted ? connectorColorHighlight : connectorColor}
        />
      )}

      {topHighlighted && <use href={`connector-${x}-${y}-${-1}`} />}
      {bottomHighlighted && <use href={`connector-${x}-${y}-${1}`} />}
    </>
  );
};
export default Connector;

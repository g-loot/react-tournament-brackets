import React from 'react';
import { calculatePositionOfMatch } from '../utils';
import MatchWrapper from '../match-wrapper';
import Connectors from '../connectors';

const FinalGame = ({
  match,
  columns,
  rowIndex,
  columnIndex,
  gameHeight,
  gameWidth,
  calculatedStyles,
  onMatchClick,
  onPartyClick,
  matchComponent,
}) => {
  const { canvasPadding, columnWidth, rowHeight, roundHeader, width } =
    calculatedStyles;
  const { x, y } = calculatePositionOfMatch(rowIndex, columnIndex, {
    canvasPadding,
    columnWidth,
    rowHeight,
  });

  return (
    <>
      <g>
        <MatchWrapper
          x={x}
          y={
            y +
            (roundHeader.isShown
              ? roundHeader.height + roundHeader.marginBottom
              : 0)
          }
          rowIndex={rowIndex}
          columnIndex={columnIndex}
          match={match}
          topText={match.startTime}
          bottomText={match.name}
          teams={match.participants}
          onMatchClick={onMatchClick}
          onPartyClick={onPartyClick}
          style={calculatedStyles}
          matchComponent={matchComponent}
        />
      </g>
    </>
  );
};

export default FinalGame;

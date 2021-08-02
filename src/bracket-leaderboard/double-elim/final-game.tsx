import React from 'react';
import { calculatePositionOfMatch } from './calculate-match-position';
import MatchWrapper from '../match-wrapper';
import Connectors from './connectors';

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
  console.log(columns);
  return (
    <>
      {columnIndex !== 0 && (
        <Connectors
          {...{
            columns,
            rowIndex,
            columnIndex,
            gameHeight,
            gameWidth,
            style: calculatedStyles,
            bracketSnippet: {
              previousTopMatch: columns[0][0],
              previousBottomMatch: columns[0][1],
              currentMatch: match,
            },
          }}
        />
      )}
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

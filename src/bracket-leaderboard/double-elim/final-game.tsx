import React from 'react';
import { calculatePositionOfFinalGame } from './calculate-match-position';
import MatchWrapper from '../match-wrapper';
import Connectors from './connector-final';

const FinalGame = ({
  match,
  rowIndex,
  columnIndex,
  gameHeight,
  gameWidth,
  calculatedStyles,
  onMatchClick,
  onPartyClick,
  matchComponent,
  columns,
  numOfUpperRounds,
  numOfLowerRounds,
  upperBracketHeight,
  lowerBracketHeight,
}) => {
  const { canvasPadding, columnWidth, rowHeight, roundHeader } =
    calculatedStyles;
  const { x, y } = calculatePositionOfFinalGame(rowIndex, columnIndex, {
    canvasPadding,
    columnWidth,
    rowHeight,
    gameHeight,
    upperBracketHeight,
    lowerBracketHeight,
  });

  return (
    <>
      {columnIndex !== 0 && (
        <Connectors
          {...{
            numOfUpperRounds,
            numOfLowerRounds,
            columns,
            rowIndex,
            columnIndex,
            gameWidth,
            gameHeight,
            lowerBracketHeight,
            upperBracketHeight,

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

import React from 'react';
import MatchWrapper from 'Core/match-wrapper';
import { calculatePositionOfFinalGame } from './calculate-match-position';
import Connectors from './final-connectors';

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

  bracketSnippet,
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
            rowIndex,
            columnIndex,
            gameWidth,
            gameHeight,
            lowerBracketHeight,
            upperBracketHeight,
            style: calculatedStyles,
            bracketSnippet,
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
          previousBottomMatch={bracketSnippet.previousBottomMatch}
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

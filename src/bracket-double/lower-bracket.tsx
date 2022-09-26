import React from 'react';
import MatchWrapper from 'Core/match-wrapper';
import { getPreviousMatches } from 'Core/match-functions';
import { calculatePositionOfMatchLowerBracket } from './calculate-match-position';
import ConnectorsLower from './lower-connectors';

const LowerBracket = ({
  columns,
  calculatedStyles,
  gameHeight,
  gameWidth,
  onMatchClick,
  onPartyClick,
  matchComponent,
  upperBracketHeight,
}) => {
  const { canvasPadding, columnWidth, rowHeight, roundHeader } =
    calculatedStyles;
  return columns.map((matchesColumn, columnIndex) =>
    matchesColumn.map((match, rowIndex) => {
      const { x, y } = calculatePositionOfMatchLowerBracket(
        rowIndex,
        columnIndex,
        {
          canvasPadding,
          columnWidth,
          rowHeight,
          offsetY: upperBracketHeight,
        }
      );
      const isUpperSeedingRound = columnIndex % 2 !== 0;

      const previousBottomPosition = isUpperSeedingRound
        ? rowIndex
        : (rowIndex + 1) * 2 - 1;
      const { previousTopMatch, previousBottomMatch } = getPreviousMatches(
        columnIndex,
        columns,
        previousBottomPosition
      );
      return (
        <g key={x + y}>
          {columnIndex !== 0 && (
            <ConnectorsLower
              {...{
                bracketSnippet: {
                  currentMatch: match,
                  previousTopMatch: !isUpperSeedingRound && previousTopMatch,
                  previousBottomMatch,
                },
                rowIndex,
                columnIndex,
                gameHeight,
                gameWidth,
                style: calculatedStyles,
                offsetY: upperBracketHeight,
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
              previousBottomMatch={previousBottomMatch}
              topText={match.startTime}
              bottomText={match.name}
              teams={match.participants}
              onMatchClick={onMatchClick}
              onPartyClick={onPartyClick}
              style={calculatedStyles}
              matchComponent={matchComponent}
            />
          </g>
        </g>
      );
    })
  );
};
export default LowerBracket;

import React from 'react';
import MatchWrapper from 'Core/match-wrapper';
import { getPreviousMatches } from 'Core/match-functions';
import { calculatePositionOfMatchUpperBracket } from './calculate-match-position';
import ConnectorsUpper from './upper-connectors';

const UpperBracket = ({
  columns,
  calculatedStyles,
  gameHeight,
  gameWidth,
  onMatchClick,
  onPartyClick,
  matchComponent,
}) => {
  const { canvasPadding, columnWidth, rowHeight, roundHeader } =
    calculatedStyles;
  return columns.map((matchesColumn, columnIndex) =>
    matchesColumn.map((match, rowIndex) => {
      const { x, y } = calculatePositionOfMatchUpperBracket(
        rowIndex,
        columnIndex,
        {
          canvasPadding,
          columnWidth,
          rowHeight,
        }
      );
      const previousBottomPosition = (rowIndex + 1) * 2 - 1;
      const { previousTopMatch, previousBottomMatch } = getPreviousMatches(
        columnIndex,
        columns,
        previousBottomPosition
      );
      return (
        <g key={x + y}>
          {columnIndex !== 0 && (
            <ConnectorsUpper
              {...{
                bracketSnippet: {
                  currentMatch: match,
                  previousTopMatch,
                  previousBottomMatch,
                },
                rowIndex,
                columnIndex,
                gameHeight,
                gameWidth,
                style: calculatedStyles,
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
export default UpperBracket;

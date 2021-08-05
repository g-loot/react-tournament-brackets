import React from 'react';
import MatchWrapper from 'Core/match-wrapper';
import { calculatePositionOfMatchUpperBracket } from './calculate-match-position';
import Connectors from './connectors';

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
      const previousTopMatch =
        columnIndex !== 0 &&
        columns[columnIndex - 1][previousBottomPosition - 1];
      const previousBottomMatch =
        columnIndex !== 0 && columns[columnIndex - 1][previousBottomPosition];
      return (
        <>
          {columnIndex !== 0 && (
            <Connectors
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
    })
  );
};
export default UpperBracket;

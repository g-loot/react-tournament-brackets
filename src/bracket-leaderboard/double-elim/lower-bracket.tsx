import React from 'react';
import {
  calculatePositionOfMatch,
  calculatePositionOfMatchLowerBracket,
} from './calculate-match-position';
import MatchWrapper from '../match-wrapper';
import Connectors from './connectors';

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
                offsetY: upperBracketHeight,
                isLowerBracket: true,
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
export default LowerBracket;

import React from 'react';
import RoundHeader from 'Components/round-header';
import { calculatePositionOfMatchLowerBracket } from './calculate-match-position';

const RoundHeaders = ({
  numOfRounds,
  calculatedStyles: {
    canvasPadding,
    columnWidth,
    rowHeight,
    roundHeader,
    width,
  },
}) => {
  return (
    <>
      {[...new Array(numOfRounds)].map((matchesColumn, columnIndex) => {
        const { x } = calculatePositionOfMatchLowerBracket(0, columnIndex, {
          canvasPadding,
          columnWidth,
          rowHeight,
        });

        return (
          <>
            {roundHeader.isShown && (
              <RoundHeader
                x={x}
                roundHeader={roundHeader}
                canvasPadding={canvasPadding}
                width={width}
                numOfRounds={numOfRounds}
                tournamentRoundText={columnIndex + 1}
                columnIndex={columnIndex}
              />
            )}
          </>
        );
      })}
    </>
  );
};
export default RoundHeaders;

import React from 'react';
import { calculatePositionOfMatch } from '../utils';
import MatchWrapper from '../match-wrapper';
import Connectors from '../connectors';
import RoundHeader from '../svg-components/round-header';

const LowerBracket = ({
  columns,
  canvasPadding,
  columnWidth,
  rowHeight,
  roundHeader,
  width,
  gameHeight,
  gameWidth,
  style,
  onMatchClick,
  onPartyClick,
  matchComponent,
  upperBracketHeight,
}) =>
  columns.map((matchesColumn, columnIndex) =>
    matchesColumn.map((match, rowIndex) => {
      const { x, y } = calculatePositionOfMatch(rowIndex, columnIndex, {
        canvasPadding,
        columnWidth,
        rowHeight,
        offsetY: upperBracketHeight,
      });

      return (
        <>
          {roundHeader.isShown && (
            <RoundHeader
              x={x}
              roundHeader={roundHeader}
              canvasPadding={canvasPadding}
              width={width}
              columns={columns}
              tournamentRoundText={columnIndex + 1}
              columnIndex={columnIndex}
            />
          )}
          {columnIndex !== 0 && (
            <Connectors
              {...{
                columns,
                rowIndex,
                columnIndex,
                gameHeight,
                gameWidth,
                style,
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
              style={style}
              matchComponent={matchComponent}
            />
          </g>
        </>
      );
    })
  );
export default LowerBracket;

import React from 'react';
import { ThemeProvider } from 'styled-components';
import { sortAlphanumerically } from 'Utils/string';
import { calculateSVGDimensions } from '../shared/calculate-svg-dimensions';
import {
  BracketLeaderboardProps,
  DoubleElimLeaderboardProps,
} from '../../types';
import { defaultStyle, getCalculatedStyles } from '../settings';
import { calculatePositionOfMatch } from '../utils';

import { MatchContextProvider } from '../match-context';
import MatchWrapper from '../match-wrapper';
import Connectors from '../connectors';
import defaultTheme from '../themes';

import RoundHeader from '../svg-components/round-header';

const BracketLeaderboard = ({
  matches,
  matchComponent,
  currentRound,
  onMatchClick,
  onPartyClick,
  svgWrapper: SvgWrapper = ({ children }) => <div>{children}</div>,
  theme = defaultTheme,
  options: { style: inputStyle } = {
    style: defaultStyle,
  },
}: DoubleElimLeaderboardProps) => {
  const style = {
    ...defaultStyle,
    ...inputStyle,
    roundHeader: {
      ...defaultStyle.roundHeader,
      ...inputStyle.roundHeader,
    },
    lineInfo: {
      ...defaultStyle.lineInfo,
      ...inputStyle.lineInfo,
    },
  };

  const { roundHeader, columnWidth, canvasPadding, rowHeight, width } =
    getCalculatedStyles(style);

  const lastGame = matches.upper.find(match => !match.nextMatchId);

  const generateColumn = (matchesColumn, listOfMatches) => {
    const previousMatchesColumn = matchesColumn.reduce((result, match) => {
      return [
        ...result,
        ...listOfMatches
          .filter(m => m.nextMatchId === match.id)
          .sort((a, b) => sortAlphanumerically(a.name, b.name)),
      ];
    }, []);

    if (previousMatchesColumn.length > 0) {
      return [
        ...generateColumn(previousMatchesColumn, listOfMatches),
        previousMatchesColumn,
      ];
    }
    return [previousMatchesColumn];
  };
  const generate2DBracketArray = (final, listOfMatches) => {
    return final
      ? [...generateColumn([final], listOfMatches), [final]].filter(
          arr => arr.length > 0
        )
      : [];
  };
  const upperColumns = generate2DBracketArray(lastGame, matches.upper);
  const lowerColumns = generate2DBracketArray(lastGame, matches.lower);
  // [
  //   [ First column ]
  //   [ 2nd column ]
  //   [ 3rd column ]
  //   [ lastGame ]
  // ]
  console.log('upperColumns: ', upperColumns);
  console.log('lowerColumns: ', lowerColumns);

  const { gameWidth, gameHeight, startPosition } = calculateSVGDimensions(
    lowerColumns,
    rowHeight,
    columnWidth,
    canvasPadding,
    roundHeader,
    currentRound
  );

  return (
    <ThemeProvider theme={theme}>
      <SvgWrapper
        bracketWidth={gameWidth}
        bracketHeight={gameHeight}
        startAt={startPosition}
      >
        <svg
          height={gameHeight}
          width={gameWidth}
          viewBox={`0 0 ${gameWidth} ${gameHeight}`}
        >
          <MatchContextProvider>
            <g>
              {lowerColumns.map((matchesColumn, columnIndex) =>
                matchesColumn.map((match, rowIndex) => {
                  const { x, y } = calculatePositionOfMatch(
                    rowIndex,
                    columnIndex,
                    {
                      canvasPadding,
                      columnWidth,
                      rowHeight,
                    }
                  );

                  return (
                    <>
                      {roundHeader.isShown && (
                        <RoundHeader
                          x={x}
                          roundHeader={roundHeader}
                          canvasPadding={canvasPadding}
                          width={width}
                          columns={lowerColumns}
                          tournamentRoundText={match.tournamentRoundText}
                          columnIndex={columnIndex}
                        />
                      )}
                      {columnIndex !== 0 && (
                        <Connectors
                          {...{
                            columns: lowerColumns,
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
              )}
            </g>
          </MatchContextProvider>
        </svg>
      </SvgWrapper>
    </ThemeProvider>
  );
};

export default BracketLeaderboard;

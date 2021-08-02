import React from 'react';
import { ThemeProvider } from 'styled-components';
import { generatePreviousRound } from '../shared/match-functions';
import { calculateSVGDimensions } from '../shared/calculate-svg-dimensions';
import { DoubleElimLeaderboardProps } from '../../types';
import { defaultStyle, getCalculatedStyles } from '../settings';

import { MatchContextProvider } from '../match-context';

import defaultTheme from '../themes';

import UpperBracket from './upper-bracket';
import LowerBracket from './lower-bracket';
import RoundHeaders from './round-headers';
import FinalGame from './final-game';

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

  const calculatedStyles = getCalculatedStyles(style);

  const { roundHeader, columnWidth, canvasPadding, rowHeight, width } =
    calculatedStyles;
  const lastGame = matches.upper.find(match => !match.nextMatchId);

  const generateColumn = (matchesColumn, listOfMatches) => {
    const previousMatchesColumn = generatePreviousRound(
      matchesColumn,
      listOfMatches
    );

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
      ? [...generateColumn([final], listOfMatches), []].filter(
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

  const upperBracketDimensions = calculateSVGDimensions(
    upperColumns[0].length,
    upperColumns.length,
    rowHeight,
    columnWidth,
    canvasPadding,
    roundHeader,
    currentRound
  );
  const lowerBracketDimensions = calculateSVGDimensions(
    lowerColumns[0].length,
    lowerColumns.length,
    rowHeight,
    columnWidth,
    canvasPadding,
    roundHeader,
    currentRound
  );
  const fullBracketDimensions = calculateSVGDimensions(
    lowerColumns[0].length,
    lowerColumns.length + 1,
    rowHeight,
    columnWidth,
    canvasPadding,
    roundHeader,
    currentRound
  );

  const { gameWidth } = fullBracketDimensions;
  const gameHeight =
    upperBracketDimensions.gameHeight + lowerBracketDimensions.gameHeight;
  const { startPosition } = upperBracketDimensions;

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
              <RoundHeaders
                {...{
                  numOfRounds: lowerColumns.length + 1,
                  calculatedStyles,
                }}
              />
              <UpperBracket
                {...{
                  columns: upperColumns,
                  calculatedStyles,

                  gameHeight,
                  gameWidth,
                  onMatchClick,
                  onPartyClick,
                  matchComponent,
                }}
              />
              <LowerBracket
                {...{
                  columns: lowerColumns,
                  calculatedStyles,
                  gameHeight,
                  gameWidth,
                  onMatchClick,
                  onPartyClick,
                  matchComponent,
                  upperBracketHeight: upperBracketDimensions.gameHeight,
                }}
              />
              <FinalGame
                {...{
                  match: lastGame,
                  columns: [
                    generatePreviousRound(
                      [lastGame],
                      [matches.upper, ...matches.lower]
                    ),
                  ],
                  calculatedStyles,
                  columnIndex: lowerColumns.length,
                  rowIndex: 0,
                  gameHeight,
                  gameWidth,
                  matchComponent,
                  onMatchClick,
                  onPartyClick,
                }}
              />
            </g>
          </MatchContextProvider>
        </svg>
      </SvgWrapper>
    </ThemeProvider>
  );
};

export default BracketLeaderboard;

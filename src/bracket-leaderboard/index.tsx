import React from 'react';
import { sortAlphanumerically } from 'Utils/string';
import { BracketLeaderboardProps } from '../types';
import { defaultStyle, getCalculatedStyles } from './settings';
import { calculatePositionOfMatch } from './utils';

import { MatchContextProvider } from './match-context';
import MatchWrapper from './match-wrapper';
import Connectors from './connectors';

const BracketLeaderboard = ({
  matches,
  matchComponent,
  currentRound,
  onMatchClick,
  onPartyClick,
  svgWrapper: SvgWrapper = ({ children }) => <div>{children}</div>,
  options: { style: inputStyle } = { style: defaultStyle },
}: BracketLeaderboardProps) => {
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

  const lastGame = matches.find(match => !match.nextMatchId);

  const generateColumn = matchesColumn => {
    const previousMatchesColumn = matchesColumn.reduce((result, match) => {
      return [
        ...result,
        ...matches
          .filter(m => m.nextMatchId === match.id)
          .sort((a, b) => sortAlphanumerically(a.name, b.name)),
      ];
    }, []);

    if (previousMatchesColumn.length > 0) {
      return [...generateColumn(previousMatchesColumn), previousMatchesColumn];
    }
    return [previousMatchesColumn];
  };
  const generate2DBracketArray = final => {
    return final
      ? [...generateColumn([final]), [final]].filter(arr => arr.length > 0)
      : [];
  };
  const columns = generate2DBracketArray(lastGame);
  // [
  //   [ First column ]
  //   [ 2nd column ]
  //   [ 3rd column ]
  //   [ lastGame ]
  // ]

  const bracketHeight = columns[0].length * rowHeight;
  const bracketWidth = columns.length * columnWidth;

  const gameHeight =
    bracketHeight +
    canvasPadding * 2 +
    (roundHeader.isShown ? roundHeader.height + roundHeader.marginBottom : 0);
  const gameWidth = bracketWidth + canvasPadding * 2;
  const startPosition = [
    currentRound
      ? -(parseInt(currentRound, 10) * columnWidth - canvasPadding * 2)
      : 0, // Go to the current round on mount
    0,
  ];

  return (
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
            {columns.map((matchesColumn, columnIndex) =>
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
                      <g>
                        <rect
                          x={x}
                          y={canvasPadding}
                          width={width}
                          height={roundHeader.height}
                          fill={roundHeader.backgroundColor}
                          rx="3"
                          ry="3"
                        />
                        <text
                          x={x + width / 2}
                          y={canvasPadding + roundHeader.height / 2}
                          style={{
                            fontSize: `${roundHeader.fontSize}px`,
                            color: roundHeader.fontColor,
                          }}
                          fill="currentColor"
                          dominantBaseline="middle"
                          textAnchor="middle"
                        >
                          {columnIndex + 1 === columns.length && 'Final'}
                          {columnIndex + 1 === columns.length - 1 &&
                            'Semi-final'}
                          {columnIndex + 1 < columns.length - 1 &&
                            `Round ${match.tournamentRoundText}`}
                        </text>
                      </g>
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
            )}
          </g>
        </MatchContextProvider>
      </svg>
    </SvgWrapper>
  );
};

export default BracketLeaderboard;

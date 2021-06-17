import React from 'react';
import { sortAlphanumerically } from 'Utils/string';
import Match from './match';
import Connectors from './connectors';
import { calculatePositionOfMatch } from './utils';
import { defaultStyle, getCalculatedStyles } from './settings';
import { MatchContextProvider } from './match-context';
/*
  {
    id: number|string,
    name: string,
    nextMatchId: number,
    nextLooserMatchId: number,
    tournamentRoundText: string,
    startTime: string,
    state: 'PLAYED'|'NO_SHOW'|'WALKOVER'|'NO_PARTY',
    participants: [
      {
        id: (string|number),
        resultText: string,
        isWinner: boolean,
        status: 'PLAYED'|'NO_SHOW'|'WALKOVER'|'NO_PARTY',
        name: string,
      },
      {
        id: (string|number),
        resultText: string,
        isWinner: boolean,
        status: 'PLAYED'|'NO_SHOW'|'WALKOVER'|'NO_PARTY',
        name: string,
      },
    ],
    * @param {[{ id: number|string,name: 'Final - Match',nextMatchId: number,nextLooserMatchId: number,tournamentRoundText: string,startTime: string,state: 'PLAYED'|'NO_SHOW'|'WALKOVER'|'NO_PARTY',participants: [  {    id: (string|number),    resultText: string,    isWinner: boolean,    status: 'PLAYED'|'NO_SHOW'|'WALKOVER'|'NO_PARTY',    name: string,  },  {    id: (string|number),    resultText: string,    isWinner: boolean,    status: 'PLAYED'|'NO_SHOW'|'WALKOVER'|'NO_PARTY',    name: string,  },],}]} matches - Called on clicking on the any of the two parties
  } */
/**
 * @param {Object} props
 * @param {Object[]} props.matches - a list of linked matches for displaying the bracket
 * @param {(number|string)} props.matches[].id -
 * @param {string} props.matches[].name -
 * @param {number} props.matches[].nextMatch -
 * @param {number} props.matches[].nextLooserMatch -
 * @param {string} props.matches[].tournamentRoundText -
 * @param {string} props.matches[].startTime - Start time of the match in ISO format example: 2021-03-02T23:00:00.000+0000
 * @param {('PLAYED'|'NO_SHOW'|'WALKOVER'|'NO_PARTY')} props.matches[].state -
 * @param {Object[]} props.matches[].participants -
 * @param {(string|number)} props.matches[].participants[]. -
 * @param {string} props.matches[].participants[].resultText -
 * @param {boolean} props.matches[].participants[].isWinner -
 * @param {'PLAYED'|'NO_SHOW'|'WALKOVER'|'NO_PARTY'} props.matches[].participants[].status -
 * @param {string} props.matches[].participants[].name -
 * @param {JSX.Element} props.matchComponent - A react component for rendering the match it will get passed all the props you need to customize the match view
 * @param {string} props.currentRound - the current ongoing round column in the tournament, the SVG viewer
 * @param {function} props.onPartyClick - Called on clicking on the any of the two parties
 * @param {function} props.onMatchClick - Called on clicking on the match details
 * @param {*} props.svgWrapper - Used to inject anything as a parent to the SVG Node, Usually an SVG Viewer for panning and zooming
 * @param {Object} props.options - Used to inject anything as a parent to the SVG Node, Usually an SVG Viewer for panning and zooming
 * @returns
 */
const BracketLeaderboard = ({
  matches,
  matchComponent,
  currentRound,
  onMatchClick,
  onPartyClick,
  svgWrapper: SvgWrapper = <div />,
  options: { style: inputStyle = defaultStyle } = {},
}) => {
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
    currentRound ? -(currentRound * columnWidth - canvasPadding * 2) : 0, // Go to the current round on mount
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
                      <Match
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

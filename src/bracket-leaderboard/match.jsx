import React, { useContext } from 'react';
import { matchContext } from './match-context';
import { MATCH_STATES } from './match-states';
import { defaultStyle, getCalculatedStyles } from './settings';
import {
  Score,
  Side,
  StyledMatch,
  Team,
  TopText,
  BottomText,
  Wrapper,
  Line,
  Anchor,
} from './styles';

function Match({
  rowIndex,
  columnIndex,
  match,
  teams,
  topText,
  bottomText,
  style = defaultStyle,
  matchComponent: MatchComponent,
  onMatchClick,
  onPartyClick,
  ...rest
}) {
  const {
    state: { hoveredPartyId },
    dispatch,
  } = useContext(matchContext);
  const computedStyles = getCalculatedStyles(style);
  const { width = 300, boxHeight = 70, connectorColor } = computedStyles;

  const top = teams?.[0] ?? {};
  const bottom = teams?.[1] ?? {};

  const topHovered =
    !Number.isNaN(hoveredPartyId) &&
    top?.id !== undefined &&
    hoveredPartyId === top.id;
  const bottomHovered =
    !Number.isNaN(hoveredPartyId) &&
    bottom?.id !== undefined &&
    hoveredPartyId === bottom.id;

  // Lower placement is better
  const topWon = top.status === MATCH_STATES.WALKOVER || top.isWinner;
  const bottomWon = bottom.status === MATCH_STATES.WALKOVER || bottom.isWinner;

  const matchState = MATCH_STATES[match.state];
  const teamNameFallback = matchState === MATCH_STATES.WALKOVER ? '' : 'TBD';
  const resultFallback = participant =>
    ({
      [MATCH_STATES.WALKOVER]: computedStyles.wonBywalkOverText,
      [MATCH_STATES.NO_SHOW]: computedStyles.lostByNoShowText,
      [MATCH_STATES.NO_PARTY]: computedStyles.lostByNoShowText,
    }[participant.status] ?? '');

  return (
    <svg
      width={width}
      height={boxHeight}
      viewBox={`0 0 ${width} ${boxHeight}`}
      {...rest}
    >
      <foreignObject x={0} y={0} width={width} height={boxHeight}>
        {/* TODO: Add OnClick Match handler */}
        {MatchComponent ? (
          <MatchComponent
            {...{
              match,
              onMatchClick,
              onPartyClick,
              top,
              bottom,
              topWon,
              bottomWon,
              topHovered,
              bottomHovered,
              topText,
              bottomText,
              connectorColor,
              computedStyles,
            }}
          />
        ) : (
          <Wrapper>
            <div styles={{ display: 'flex', justifyContent: 'space-between' }}>
              <TopText>{topText}</TopText>
              {typeof onMatchClick === 'function' && (
                <Anchor
                  onClick={() => onMatchClick?.({ match, topWon, bottomWon })}
                >
                  <TopText>Match Details</TopText>
                </Anchor>
              )}
            </div>
            <StyledMatch>
              <Side
                onMouseEnter={() => {
                  dispatch({
                    type: 'SET_HOVERED_PARTYID',
                    payload: {
                      partyId: top.id,
                      matchId: match.id,
                      rowIndex,
                      columnIndex,
                    },
                  });
                }}
                onMouseLeave={() => {
                  dispatch({ type: 'SET_HOVERED_PARTYID', payload: null });
                }}
                won={topWon}
                hovered={topHovered}
                onClick={() => onPartyClick?.(top, topWon)}
              >
                <Team>{top?.name ?? teamNameFallback}</Team>
                <Score won={topWon}>
                  {top?.resultText ?? resultFallback(top)}
                </Score>
              </Side>
              <Line highlighted={topHovered || bottomHovered} />
              <Side
                onMouseEnter={() => {
                  dispatch({
                    type: 'SET_HOVERED_PARTYID',
                    payload: {
                      partyId: bottom.id,
                      matchId: match.id,
                      rowIndex,
                      columnIndex,
                    },
                  });
                }}
                onMouseLeave={() => {
                  dispatch({ type: 'SET_HOVERED_PARTYID', payload: null });
                }}
                won={bottomWon}
                hovered={bottomHovered}
                onClick={() => onPartyClick?.(bottom, bottomWon)}
              >
                <Team>{bottom?.name ?? teamNameFallback}</Team>
                <Score won={bottomWon}>
                  {bottom?.resultText ?? resultFallback(bottom)}
                </Score>
              </Side>
            </StyledMatch>
            <BottomText>{bottomText ?? ' '}</BottomText>
          </Wrapper>
        )}
      </foreignObject>
    </svg>
  );
}

export default Match;

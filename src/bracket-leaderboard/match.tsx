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

  const topParty = teams?.[0] ?? {};
  const bottomParty = teams?.[1] ?? {};

  const topHovered =
    !Number.isNaN(hoveredPartyId) &&
    topParty?.id !== undefined &&
    hoveredPartyId === topParty.id;
  const bottomHovered =
    !Number.isNaN(hoveredPartyId) &&
    bottomParty?.id !== undefined &&
    hoveredPartyId === bottomParty.id;

  // Lower placement is better
  const topWon = topParty.status === MATCH_STATES.WALKOVER || topParty.isWinner;
  const bottomWon =
    bottomParty.status === MATCH_STATES.WALKOVER || bottomParty.isWinner;

  const matchState = MATCH_STATES[match.state];
  const teamNameFallback = matchState === MATCH_STATES.WALKOVER ? '' : 'TBD';
  const resultFallback = participant =>
    ({
      [MATCH_STATES.WALKOVER]: computedStyles.wonBywalkOverText,
      [MATCH_STATES.NO_SHOW]: computedStyles.lostByNoShowText,
      [MATCH_STATES.NO_PARTY]: computedStyles.lostByNoShowText,
    }[participant.status] ?? '');

  const onMouseEnter = partyId => {
    dispatch({
      type: 'SET_HOVERED_PARTYID',
      payload: {
        partyId,
        matchId: match.id,
        rowIndex,
        columnIndex,
      },
    });
  };
  const onMouseLeave = () => {
    dispatch({ type: 'SET_HOVERED_PARTYID', payload: null });
  };

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
              onMouseEnter,
              onMouseLeave,
              topParty,
              bottomParty,
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
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
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
                onMouseEnter={() => onMouseEnter(topParty.id)}
                onMouseLeave={onMouseLeave}
                won={topWon}
                hovered={topHovered}
                onClick={() => onPartyClick?.(topParty, topWon)}
              >
                <Team>{topParty?.name ?? teamNameFallback}</Team>
                <Score won={topWon}>
                  {topParty?.resultText ?? resultFallback(topParty)}
                </Score>
              </Side>
              <Line highlighted={topHovered || bottomHovered} />
              <Side
                onMouseEnter={() => onMouseEnter(bottomParty.id)}
                onMouseLeave={onMouseLeave}
                won={bottomWon}
                hovered={bottomHovered}
                onClick={() => onPartyClick?.(bottomParty, bottomWon)}
              >
                <Team>{bottomParty?.name ?? teamNameFallback}</Team>
                <Score won={bottomWon}>
                  {bottomParty?.resultText ?? resultFallback(bottomParty)}
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

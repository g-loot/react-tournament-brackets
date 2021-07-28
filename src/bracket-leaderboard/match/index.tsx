import React from 'react';
import { MatchComponentProps } from '../../types';
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
  bottomHovered,
  bottomParty,
  bottomText,
  bottomWon,
  match,
  onMatchClick,
  onMouseEnter,
  onMouseLeave,
  onPartyClick,
  topHovered,
  topParty,
  topText,
  topWon,
  teamNameFallback,
  resultFallback,
}: MatchComponentProps) {
  return (
    <Wrapper>
      <div style={{ display: 'flex', justifyContent: 'space-between' }}>
        <TopText>{topText}</TopText>
        {typeof onMatchClick === 'function' && (
          <Anchor onClick={() => onMatchClick?.({ match, topWon, bottomWon })}>
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
  );
}

export default Match;

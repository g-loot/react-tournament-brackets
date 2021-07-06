import React, { ReactElement } from 'react';
// import { Props as SVGPanZoomProps } from 'react-svg-pan-zoom';

export class Participant {
  id: string | number;

  resultText: string;

  isWinner: boolean;

  status: 'PLAYED' | 'NO_SHOW' | 'WALKOVER' | 'NO_PARTY';

  name: string;
}

export class Match {
  id: number | string;

  name: string;

  nextMatchId: number;

  nextLooserMatchId: number;

  tournamentRoundText: string;

  startTime: string;

  state: 'PLAYED' | 'NO_SHOW' | 'WALKOVER' | 'NO_PARTY';

  participants: Participant[];
}

export class Options {
  width: number;

  boxHeight: number;

  canvasPadding: number;

  spaceBetweenColumns: number;

  spaceBetweenRows: number;

  connectorColor: string;

  connectorColorHighlight: string;

  roundHeader: {
    isShown: boolean;
    height: number;
    marginBottom: number;
    fontSize: number;
    fontColor: string;
    backgroundColor: string;
    fontFamily: string;
  };

  roundSeparatorWidth: number;

  lineInfo: {
    separation: number;
    homeVisitorSpread: number;
  };

  horizontalOffset: number;

  wonBywalkOverText: string;

  lostByNoShowText: string;
}

export class ComputedOptions extends Options {
  rowHeight: number;

  columnWidth: number;
}

export class SvgViewerProps {
  height: number;

  width: number;

  bracketWidth: number;

  bracketHeight: number;

  children: ReactElement;

  startAt: number[];

  scaleFactor: number;
}

export class MatchComponentProps {
  match: Match;

  onMatchClick: (args: {
    match: Match;
    topWon: boolean;
    bottomWon: boolean;
  }) => void;

  onPartyClick: (party: Participant, partyWon: boolean) => void;

  onMouseEnter: (partyId: string | number) => void;

  onMouseLeave: () => void;

  topParty: Participant;

  bottomParty: Participant;

  topWon: boolean;

  bottomWon: boolean;

  topHovered: boolean;

  bottomHovered: boolean;

  topText: string;

  bottomText: string;

  connectorColor: string;

  computedStyles: ComputedOptions;

  teamNameFallback: string;

  resultFallback: (participant: Participant) => string;
}

export type Themes = 'dark' | string | undefined;
export class Theme {
  fontFamily: string;

  transitionTimingFunction: string;

  disabledColor: string;

  matchBackground: {
    wonColor: string;
    lostColor: string;
  };

  border: {
    color: string;
    highlightedColor: string;
  };

  textColor: {
    highlighted: string;
    main: string;
    dark: string;
    disabled: string;
  };

  score: {
    text: {
      wonColor: string;
      lostColor: string;
    };
    background: {
      wonColor: string;
      lostColor: string;
    };
  };

  lineColor: string;

  canvasBackground: string;
}

export class BracketLeaderboardProps {
  matches: Match[];

  matchComponent: (props: MatchComponentProps) => JSX.Element;

  currentRound: string;

  onMatchClick: (args: {
    match: Match;
    topWon: boolean;
    bottomWon: boolean;
  }) => void;

  onPartyClick: (party: Participant, partyWon: boolean) => void;

  svgWrapper: (props: {
    bracketWidth: number;
    bracketHeight: number;
    startAt: number[];
    children: ReactElement;
  }) => React.ReactElement;

  theme: Object;

  options: { style: Options };
}

import React, { ReactElement } from 'react';
// import { Props as SVGPanZoomProps } from 'react-svg-pan-zoom';

export type Participant = {
  id: string | number;

  isWinner: boolean;

  name?: string;

  status?: 'PLAYED' | 'NO_SHOW' | 'WALK_OVER' | 'NO_PARTY' | string | null;

  resultText?: string | null;

  [key: string]: any;
};

export type Match = {
  id: number | string;

  name?: string;

  nextMatchId: string | number | null;

  nextLooserMatchId?: number;

  tournamentRoundText: string;

  startTime: string;

  state: 'PLAYED' | 'NO_SHOW' | 'WALK_OVER' | 'NO_PARTY' | string;

  participants: Participant[];

  [key: string]: any;
};

export type Options = {
  width?: number;

  boxHeight?: number;

  canvasPadding?: number;

  spaceBetweenColumns?: number;

  spaceBetweenRows?: number;

  connectorColor?: string;

  connectorColorHighlight?: string;

  roundHeader?: {
    isShown?: boolean;
    height?: number;
    marginBottom?: number;
    fontSize?: number;
    fontColor?: string;
    backgroundColor?: string;
    fontFamily?: string;
  };

  roundSeparatorWidth?: number;

  lineInfo?: {
    separation?: number;
    homeVisitorSpread?: number;
  };

  horizontalOffset?: number;

  wonBywalkOverText?: string;

  lostByNoShowText?: string;
};

export type ComputedOptions = Options & {
  rowHeight?: number;

  columnWidth?: number;
};

export type SvgViewerProps = {
  height: number;

  width: number;

  bracketWidth: number;

  bracketHeight: number;

  children: ReactElement;

  startAt: number[];

  scaleFactor: number;
};

export type MatchComponentProps = {
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

  connectorColor?: string;

  computedStyles?: ComputedOptions;

  teamNameFallback: string;

  resultFallback: (participant: Participant) => string;
};
export type Theme = {
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
      highlightedWonColor: string;
      highlightedLostColor: string;
    };
    background: {
      wonColor: string;
      lostColor: string;
    };
  };

  canvasBackground: string;
};

export type BracketLeaderboardProps = {
  matchComponent: (props: MatchComponentProps) => JSX.Element;

  svgWrapper?: (props: {
    bracketWidth: number;
    bracketHeight: number;
    startAt: number[];
    children: ReactElement;
  }) => React.ReactElement;

  currentRound?: string;

  onMatchClick?: (args: {
    match: Match;
    topWon: boolean;
    bottomWon: boolean;
  }) => void;

  onPartyClick?: (party: Participant, partyWon: boolean) => void;

  theme?: Theme;

  options?: { style: Options };
};

export type SingleElimLeaderboardProps = BracketLeaderboardProps & {
  matches: Match[];
};

export type DoubleElimLeaderboardProps = BracketLeaderboardProps & {
  matches: { upper: Match[]; lower: Match[] };
};

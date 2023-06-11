import React from 'react';
import useWindowSize from 'Hooks/use-window-size';
import BracketLeaderboard from './bracket-single/single-elim-bracket';
import SvgViewer from './svg-viewer';
import { simpleSmallBracket } from './mock-data/simple-data';

export default {
  title: 'Components/Custom',
  component: BracketLeaderboard,
};

export function CustomMatchBracket() {
  const [width, height] = useWindowSize();
  const finalWidth = Math.max(width - 50, 500);
  const finalHeight = Math.max(height - 100, 500);
  return (
    <BracketLeaderboard
      matches={simpleSmallBracket}
      options={{
        style: {
          roundHeader: { backgroundColor: '#AAA' },
          connectorColor: '#FF8C00',
          connectorColorHighlight: '#000',
        },
      }}
      svgWrapper={({ children, ...props }) => (
        <SvgViewer
          background="#FFF"
          SVGBackground="#FFF"
          width={finalWidth}
          height={finalHeight}
          {...props}
        >
          {children}
        </SvgViewer>
      )}
      matchComponent={({
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
        teamNameFallback,
        resultFallback,
      }) => (
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-around',
            color: '#000',
            width: '100%',
            height: '100%',
          }}
        >
          <div
            onMouseEnter={() => onMouseEnter(topParty.id)}
            style={{ display: 'flex' }}
          >
            <div>{topParty.name || teamNameFallback}</div>
            <div>{topParty.resultText ?? resultFallback(topParty)}</div>
          </div>
          <div
            style={{ height: '1px', width: '100%', background: '#FF8C00' }}
          />
          <div
            onMouseEnter={() => onMouseEnter(bottomParty.id)}
            style={{ display: 'flex' }}
          >
            <div>{bottomParty.name || teamNameFallback}</div>
            <div>{bottomParty.resultText ?? resultFallback(topParty)}</div>
          </div>
        </div>
      )}
    />
  );
}

import React from 'react';
import useWindowSize from 'Hooks/use-window-size';
import SingleEliminationBracket from './single-elim/single-elim-bracket';
import SvgViewer from '../svg-viewer';
import { simpleSmallBracket } from './mock-data/simple-data';
import { createTheme } from './themes';
import Match from './match/index';

export default {
  title: 'Components/Custom',
  component: SingleEliminationBracket,
};

export const WhiteThemeBracket = () => {
  const [width, height] = useWindowSize();
  const finalWidth = Math.max(width - 50, 500);
  const finalHeight = Math.max(height - 100, 500);
  const customTheme = createTheme({
    textColor: { main: '#000000', highlighted: '#22222', dark: '#000000' },
    matchBackground: { wonColor: '#DDDDDD', lostColor: '#BBBBBB' },
    score: {
      background: { wonColor: '#8471db', lostColor: '#e09987' },
      text: { highlightedWonColor: '#2b3158', highlightedLostColor: '#572a2a' },
    },
    border: {
      color: '#707582',
      highlightedColor: '#000',
    },
  });
  return (
    <SingleEliminationBracket
      matches={simpleSmallBracket}
      matchComponent={Match}
      theme={customTheme}
      options={{
        style: {
          roundHeader: { backgroundColor: '#AAA', fontColor: '#000' },
          connectorColor: '#707582',
          connectorColorHighlight: '#000000',
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
    />
  );
};

export const WhiteThemeCustomMatch = () => {
  const [width, height] = useWindowSize();
  const finalWidth = Math.max(width - 50, 500);
  const finalHeight = Math.max(height - 100, 500);
  return (
    <SingleEliminationBracket
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
};

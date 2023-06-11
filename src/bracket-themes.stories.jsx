import React from 'react';
import useWindowSize from 'Hooks/use-window-size';
import Match from 'Components/match';
import WhiteTheme from 'Themes/white-theme';
import SingleEliminationBracket from './bracket-single/single-elim-bracket';
import SvgViewer from './svg-viewer';
import { simpleSmallBracket } from './mock-data/simple-data';
import GlootTheme from './themes/gloot-theme';

export default {
  title: 'Components/Themes',
  component: SingleEliminationBracket,
};

export function GlootThemeBracket() {
  const [width, height] = useWindowSize();
  const finalWidth = Math.max(width - 50, 500);
  const finalHeight = Math.max(height - 100, 500);

  return (
    <SingleEliminationBracket
      matches={simpleSmallBracket}
      matchComponent={Match}
      theme={GlootTheme}
      options={{
        style: {
          roundHeader: {
            backgroundColor: GlootTheme.roundHeader.backgroundColor,
            fontColor: GlootTheme.roundHeader.fontColor,
          },
          connectorColor: GlootTheme.connectorColor,
          connectorColorHighlight: GlootTheme.connectorColorHighlight,
        },
      }}
      svgWrapper={({ children, ...props }) => (
        <SvgViewer
          background={GlootTheme.svgBackground}
          SVGBackground={GlootTheme.svgBackground}
          width={finalWidth}
          height={finalHeight}
          {...props}
        >
          {children}
        </SvgViewer>
      )}
    />
  );
}

export function WhiteThemeBracket() {
  const [width, height] = useWindowSize();
  const finalWidth = Math.max(width - 50, 500);
  const finalHeight = Math.max(height - 100, 500);

  return (
    <SingleEliminationBracket
      matches={simpleSmallBracket}
      matchComponent={Match}
      theme={WhiteTheme}
      options={{
        style: {
          roundHeader: {
            backgroundColor: WhiteTheme.roundHeader.backgroundColor,
            fontColor: WhiteTheme.roundHeader.fontColor,
          },
          connectorColor: WhiteTheme.connectorColor,
          connectorColorHighlight: WhiteTheme.connectorColorHighlight,
        },
      }}
      svgWrapper={({ children, ...props }) => (
        <SvgViewer
          background={WhiteTheme.svgBackground}
          SVGBackground={WhiteTheme.svgBackground}
          width={finalWidth}
          height={finalHeight}
          {...props}
        >
          {children}
        </SvgViewer>
      )}
    />
  );
}

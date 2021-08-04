import React from 'react';
import useWindowSize from 'Hooks/use-window-size';
import BracketLeaderboard from './index';
import SvgViewer from '../svg-viewer';
import { simpleSmallBracket } from './mock-data/simple-data';
import Match from './match/index';
import GlootTheme from './themes/gloot-theme';

export default {
  title: 'Components/Themes',
  component: BracketLeaderboard,
};

export const GlootThemeBracket = () => {
  const [width, height] = useWindowSize();
  const finalWidth = Math.max(width - 50, 500);
  const finalHeight = Math.max(height - 100, 500);

  return (
    <BracketLeaderboard
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
};

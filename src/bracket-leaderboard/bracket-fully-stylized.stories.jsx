import React from 'react';
import useWindowSize from 'Hooks/use-window-size';
import SingleEliminationBracket from './single-elim/single-elim-bracket';
import SvgViewer from '../svg-viewer';
import { simpleSmallBracket } from './mock-data/simple-data';
import Match from './match/index';
import WhiteTheme from './themes/white-theme';

export default {
  title: 'Components/Themes',
  component: SingleEliminationBracket,
};

export const WhiteThemeBracket = () => {
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
};

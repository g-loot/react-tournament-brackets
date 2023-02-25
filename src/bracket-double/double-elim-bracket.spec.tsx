import React from 'react';
import { render } from '@testing-library/react';
import Match from 'Components/match';
import SVGViewer from '../svg-viewer';
import simpleDouble from '../mock-data/simple-data-double';
import DoubleEliminationBracket from './double-elim-bracket';

it('Renders a single elimination bracket without crashing', () => {
  render(
    <DoubleEliminationBracket
      matches={simpleDouble}
      matchComponent={Match}
      svgWrapper={({ children, ...props }) => (
        <SVGViewer width={500} height={500} {...props}>
          {children}
        </SVGViewer>
      )}
    />
  );
});

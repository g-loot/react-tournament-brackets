import React from 'react';
import { render } from '@testing-library/react';
import Match from 'Components/match';
import SVGViewer from '../svg-viewer';
import { simpleBracket } from '../mock-data/simple-data';
import SingleEliminationBracket from './single-elim-bracket';

it('Renders a single elimination bracket without crashing', () => {
  render(
    <SingleEliminationBracket
      matches={simpleBracket}
      matchComponent={Match}
      svgWrapper={({ children, ...props }) => (
        <SVGViewer width={500} height={500} {...props}>
          {children}
        </SVGViewer>
      )}
    />
  );
});

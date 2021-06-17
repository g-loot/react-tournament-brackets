import React from 'react';
import { addDecorator } from '@storybook/react';
import styled, { ThemeProvider } from 'styled-components';
import theme from '../src/vars';

import '../src/fonts/fonts.css';
import 'minireset.css/minireset.min.css';

const Wrapper = styled.div`
  color: ${({ theme }) => theme.textColor.main};
  font-family: ${({ theme }) => theme.fontFamily1};
  padding: 1rem;
`;

addDecorator(storyFn => (
  <ThemeProvider theme={theme}>
    <Wrapper>{storyFn()}</Wrapper>
  </ThemeProvider>
));

export const parameters = {
  actions: { argTypesRegex: '^on[A-Z].*' },
  backgrounds: {
    default: 'primary',
    values: [
      {
        name: 'primary',
        value: '#11121B',
      },
    ],
  },
};

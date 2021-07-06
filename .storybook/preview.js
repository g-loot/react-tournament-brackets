import { addDecorator } from '@storybook/react';

import 'minireset.css/minireset.min.css';

addDecorator(storyFn => storyFn());

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

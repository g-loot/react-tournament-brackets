import { createContext } from 'react';
import { defaultStyle } from '../settings';

const store = createContext({
  style: { ...defaultStyle, rowHeight: 0, columnWidth: 0 },
});

export { store as optionsContext };

import merge from 'deepmerge';
import { Theme } from '../types';

const defaultTheme: Theme = {
  fontFamily: '"Roboto", "Arial", "Helvetica", "sans-serif"',
  transitionTimingFunction: 'cubic-bezier(0, 0.92, 0.77, 0.99)',

  disabledColor: '#5D6371',
  roundHeaders: {
    background: '#2F3648',
  },
  matchBackground: {
    wonColor: '#1D2232',
    lostColor: '#141822',
  },
  border: {
    color: '#22293B',
    highlightedColor: '#707582',
  },
  textColor: {
    highlighted: '#E9EAEC',
    main: '#BEC0C6',
    dark: '#707582',
    disabled: '#5D6371',
  },
  score: {
    text: {
      highlightedWonColor: '#118ADE',
      highlightedLostColor: '#FF9505',
    },
    background: {
      wonColor: '#10131C',
      lostColor: '#10131C',
    },
  },
  canvasBackground: '#0B0D13',
};

export function createTheme<T>(customTheme?: Theme | T): Theme {
  return merge(defaultTheme, customTheme || {});
}

export default defaultTheme;

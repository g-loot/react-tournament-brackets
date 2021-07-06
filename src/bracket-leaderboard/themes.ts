import merge from 'deepmerge';
import { Theme, Themes } from '../types';

const darkTheme: Theme = {
  fontFamily: '"Roboto", "Arial", "Helvetica", "sans-serif"',
  transitionTimingFunction: 'cubic-bezier(0, 0.92, 0.77, 0.99)',

  disabledColor: '#5D6371',
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
      wonColor: '#118ADE',
      lostColor: '#FF9505',
    },
    background: {
      wonColor: '#10131C',
      lostColor: '#10131C',
    },
  },
  lineColor: '#22293B',
  canvasBackground: '#0B0D13',
};
const defaultThemes = {
  dark: darkTheme,
};
export function createTheme<T>(
  name: Themes = 'default',
  customTheme?: T
): Theme {
  defaultThemes[name] = merge(defaultThemes.dark, customTheme || {});

  return defaultThemes[name];
}

export default defaultThemes;

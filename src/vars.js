const theme = {
  fontFamily1: '"Roboto", "Arial", "Helvetica", "sans-serif"',
  brand: {
    main: '#CC1F38',
    shade: '#851424',
    highlight: '#F42E48',
  },
  highlight: {
    main: '#118ADE',
    shade: '#0B5A91',
    highlight: '#3DA9F3',
  },
  premium: {
    main: '#F4C21F',
    shade: '#E29500',
    highlight: '#F9DA77',
  },
  attention: {
    main: '#FF9505',
    shade: '#A35F00',
    highlight: '#FFB347',
  },
  extravaganza: {
    main: '#6C3DB8',
    shade: '#392061',
    highlight: '#9875D1',
  },
  info: {
    main: '#03CEA4',
    shade: '#02A181',
    highlight: '#86FDE5',
  },
  positive: {
    main: '#53DD6C',
    shade: '#1E9935',
    highlight: '#99EBA8',
  },
  disabled: { shade: '#1E1F28', main: '#3E414D', highlight: '#5D6371' },

  darkCanvas1: '#07090D',
  darkCanvas2: '#0B0D13',
  darkCanvas3: '#10131C',
  darkCanvas4: '#141822',
  darkCanvas5: '#1D2232',
  mediumCanvas2: '#22293B',
  mediumCanvas1: '#2F3648',
  lightCanvas3: '#707582',
  lightCanvas2: '#BEC0C6',
  lightCanvas1: '#E9EAEC',
};
theme.textColor = {
  main: theme.lightCanvas1,
  shade: theme.lightCanvas2,
  dark: theme.lightCanvas3,
  disabled: theme.disabled.highlight,
};

export default theme;

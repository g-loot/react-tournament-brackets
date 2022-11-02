const prettier = require('./prettier.config.js');

const aliases = require('./scripts/aliases.js');

module.exports = {
  extends: [
    'airbnb',
    'plugin:prettier/recommended',
    'prettier/react',
    'plugin:storybook/recommended',
  ],
  plugins: ['prettier', 'react-hooks', 'typescript'],
  env: {
    node: true,
    es6: true,
    browser: true,
    jest: true,
  },
  parser: 'babel-eslint',
  parserOptions: {
    ecmaVersion: 8,
    ecmaFeatures: {
      jsx: true,
      spread: true,
    },
    sourceType: 'module',
  },
  globals: {
    JSX: true,
    localStorage: true,
  },
  rules: {
    'import/extensions': [
      'error',
      'ignorePackages',
      {
        js: 'never',
        jsx: 'never',
        ts: 'never',
        tsx: 'never',
      },
    ],
    'max-classes-per-file': ['off'],
    'react/jsx-filename-extension': [0],
    'array-callback-return': ['off'],
    'no-use-before-define': [
      'error',
      {
        functions: false,
        classes: true,
        variables: true,
      },
    ],
    'no-console': [
      'error',
      {
        allow: ['warn', 'error', 'info', 'table'],
      },
    ],
    'prettier/prettier': ['error', prettier],
    'react/prop-types': ['off'],
    'react/state-in-constructor': ['off'],
    'react/jsx-props-no-spreading': ['off'],
    'react/destructuring-assignment': ['off'],
    'react/no-access-state-in-setstate': ['off'],
    'react/sort-comp': ['off'],
    'import/no-cycle': ['off'],
    'import/prefer-default-export': ['off'],
    'jsx-a11y/no-static-element-interactions': ['off'],
    'jsx-a11y/click-events-have-key-events': ['off'],
    'jsx-a11y/control-has-associated-label': ['off'],
    'jsx-a11y/label-has-associated-control': ['off'],
  },
  settings: {
    'import/resolver': {
      alias: {
        map: Object.keys(aliases).reduce(
          (arr, alias) => [...arr, [alias, `./src/${aliases[alias]}`]],
          []
        ),
        extensions: ['.ts', '.tsx', '.js', '.jsx'],
      },
    },
  },
  overrides: [
    {
      files: ['*.test.js', '*.spec.js'],
      rules: {
        'no-unused-expressions': 'off',
      },
    },
  ],
};

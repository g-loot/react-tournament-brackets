module.exports = {};
// .storybook/main.js

const path = require('path');
const aliases = require('../scripts/aliases');
const ROOT_DIR = path.resolve(__dirname, '../');
const SRC_DIR = path.resolve(ROOT_DIR, '/src');

// Export a function. Accept the base config as the only param.
module.exports = {
  stories: ['../src/**/*.stories.mdx', '../src/**/*.stories.@(js|jsx|ts|tsx)'],
  addons: [
    '@storybook/addon-links',
    '@storybook/addon-essentials',
    {
      name: '@storybook/addon-storysource',
      options: {
        rule: {
          // test: [/\.stories\.jsx?$/], This is default
          include: [SRC_DIR], // You can specify directories
        },
        loaderOptions: {
          prettierConfig: { printWidth: 80, singleQuote: false },
        },
      },
    },
  ],

  webpackFinal: async (config, { configType }) => {
    // `configType` has a value of 'DEVELOPMENT' or 'PRODUCTION'
    // You can change the configuration based on that.
    // 'PRODUCTION' is used when building the static version of storybook.

    // Make whatever fine-grained changes you need
    config.module.rules.push({
      test: /\.(js|jsx)$/,
      exclude: {
        test: path.resolve(ROOT_DIR, 'node_modules'),
      },
      use: {
        loader: 'babel-loader',
        options: {
          presets: [
            '@babel/preset-env',
            '@babel/preset-react',
            '@babel/preset-typescript',
          ],
          plugins: [
            '@babel/plugin-transform-regenerator',
            '@babel/plugin-transform-runtime',
            '@babel/plugin-syntax-dynamic-import',
          ],
        },
      },
    });
    config.module.rules.push({
      test: /\.(ts|tsx)$/,
      exclude: /node_modules/,
      use: ['ts-loader'],
    });
    config.resolve.extensions.push('.ts', '.tsx');
    // Alternately, for an alias:
    config.resolve.alias = Object.keys(aliases).reduce(
      (obj, alias) => ({
        ...obj,
        [alias]: path.resolve(ROOT_DIR, `src/${aliases[alias]}`),
      }),
      {}
    );
    // Return the altered config
    return config;
  },
};

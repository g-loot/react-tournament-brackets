const path = require('path');
const aliases = require('./aliases');

const ROOT_DIR = path.resolve(__dirname, '../');
const SRC_DIR = path.resolve(ROOT_DIR, 'src');
const buildDir = 'dist';
const BUILD_DIR = path.resolve(ROOT_DIR, buildDir);

module.exports = {
  entry: './index.ts',
  mode: 'production',
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
        },
      },
      {
        test: /\.(ts|tsx)$/,
        exclude: /node_modules/,
        use: ['ts-loader'],
      },
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader'],
      },
      {
        test: /\.(jpg|png|svg|ttf|otf)$/,
        use: {
          loader: 'url-loader',
          options: {
            limit: true,
          },
        },
      },
    ],
  },
  resolve: {
    extensions: ['*', '.js', '.jsx', '.ts', '.tsx', '.css'],
    alias: Object.keys(aliases).reduce(
      (obj, alias) => ({
        ...obj,
        [alias]: path.resolve(ROOT_DIR, `src/${aliases[alias]}`),
      }),
      {}
    ),
  },
  output: {
    path: BUILD_DIR,
    publicPath: '/',
    filename: 'bundle.js',
    library: '@g-loot/react-tournament-brackets',
    libraryTarget: 'umd',
    globalObject: 'this',
  },
  externals: {
    'styled-components': {
      commonjs: 'styled-components',
      commonjs2: 'styled-components',
      amd: 'styled-components',
    },
    'react': {
      commonjs: 'react',
      commonjs2: 'react',
      amd: 'react',
    },
    'react-dom': {
      commonjs: 'react-dom',
      commonjs2: 'react-dom',
      amd: 'react-dom',
    },
  },
};

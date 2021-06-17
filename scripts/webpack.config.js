const CopyPlugin = require('copy-webpack-plugin');
const path = require('path');
const aliases = require('./aliases');

const ROOT_DIR = path.resolve(__dirname, '../');
const SRC_DIR = path.resolve(ROOT_DIR, 'src');
const buildDir = 'dist';
const BUILD_DIR = path.resolve(ROOT_DIR, buildDir);

module.exports = {
  entry: './index.js',
  mode: 'production',
  plugins: [
    new CopyPlugin([
      {
        context: SRC_DIR,
        from: 'fonts/**/**.*',
        to: BUILD_DIR,
      },
    ]),
  ],
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
        test: /\.css$/,
        use: ['style-loader', 'css-loader'],
      },
      {
        test: /\.(woff|woff2|eot|ttf|otf)$/,
        use: [
          {
            loader: 'file-loader',
            options: {
              name: '[name].[ext]',
              outputPath: 'fonts/',
            },
          },
        ],
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
    extensions: ['*', '.js', '.jsx', '.css'],
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
    library: '@g-loot/gll-react-components',
    libraryTarget: 'umd',
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

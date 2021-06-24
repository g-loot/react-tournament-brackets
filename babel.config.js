const aliases = require('./scripts/aliases');

module.exports = {
  presets: [
    '@babel/preset-env',
    '@babel/preset-react',
    '@babel/preset-typescript',
  ],
  plugins: [
    [
      'module-resolver',
      {
        root: ['./src'],
        alias: Object.keys(aliases).reduce(
          (obj, alias) => ({
            ...obj,
            [alias]: `./src/${aliases[alias]}`,
          }),
          {}
        ),
      },
    ],
  ],
};

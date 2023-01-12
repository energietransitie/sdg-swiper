module.exports = function (api) {
  api.cache(true);
  return {
    presets: ['babel-preset-expo'],
    plugins: [
      'nativewind/babel',
      'transform-inline-environment-variables',
      '@babel/plugin-proposal-export-namespace-from',
      'babel-plugin-transform-typescript-metadata',
      ['babel-plugin-module-resolver', {
        alias: {
          '@screens': './src/screens',
          '@configuration': './src/configuration',
          '@hooks': './src/hooks',
          '@components': './src/components',
          '@utils': './src/utils',
          '@cotypes': './src/types',
          '@constants': './src/constants',
          '@services': './src/services',
          '@assets': './src/assets',
          '@structures': './src/structures',
          '@external-packages': './src/external-packages',
          '@managers': './src/managers'
        }
      }],
      ['@babel/plugin-proposal-decorators', { legacy: true }],
      ['@babel/plugin-proposal-class-properties', { loose: true }],
      'react-native-reanimated/plugin'
    ]
  };
};

import createExpoWebpackConfigAsync from '@expo/webpack-config/webpack';
import type webpack from 'webpack';
import type { Arguments, DevConfiguration, Environment } from '@expo/webpack-config/webpack/types';
import type { Configuration } from 'webpack';

module.exports = async (env: Environment, argv: Arguments): Promise<Configuration | DevConfiguration> => {
  const config = await createExpoWebpackConfigAsync({
    ...env,
    babel: {
      dangerouslyAddModulePathsToTranspile: ['nativewind', '@carbonaware/deck-swiper', '@gorhom']
    }
  }, argv);

  config.module?.rules.push({ test: /\.css$/i, use: ['postcss-loader'] });

  if (env.mode === 'production') {
    (config.performance as webpack.Options.Performance).hints = 'warning';
    (config.performance as webpack.Options.Performance).maxAssetSize = 3000000;
    (config.performance as webpack.Options.Performance).maxEntrypointSize = 3000000;
  }

  return config;
};

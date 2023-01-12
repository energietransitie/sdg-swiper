import type { ConfigContext, ExpoConfig } from 'expo/config';

export default ({ config }: ConfigContext): ExpoConfig => {
  return <ExpoConfig>{
    ...config,
    name: 'Carbonaware Engineer',
    slug: 'carbonaware-engineer',
    version: '1.2.0',
    orientation: 'portrait',
    icon: 'src/assets/images/icon.png',
    scheme: 'myapp',
    userInterfaceStyle: 'automatic',
    splash: {
      image: 'src/assets/images/splash.png',
      resizeMode: 'contain',
      backgroundColor: '#ffffff'
    },
    updates: {
      fallbackToCacheTimeout: 0
    },
    assetBundlePatterns: ['**/*'],
    plugins: [
      ['expo-build-properties', {
        ios: {
          useFrameworks: 'static'
        }
      }]
    ]
  };
};

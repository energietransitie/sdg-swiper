import type { LinkingOptions } from '@react-navigation/native';
import { createURL } from 'expo-linking';

const linking: LinkingOptions<IRootLinking> = {
  prefixes: [createURL('/')],
  config: {
    screens: {
      /**
       * Sustainable Development Goal Swiper routes
       */
      Sdg: '',
      SdgResult: 'result',

      /**
       * Error routes
       */
      NotFound: '*'
    }
  }
};

export type IRootLinking = {
  Sdg?: Record<string, object | undefined>;
  SdgResult?: Record<string, object | undefined>;
  NotFound?: Record<string, object | undefined>;
};

export default linking;

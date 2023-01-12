import { FontAwesome } from '@expo/vector-icons';
import Logger from '@utils/Logger';
import * as Font from 'expo-font';
import * as SplashScreen from 'expo-splash-screen';
import { useEffect, useState } from 'react';

/**
 * Load all cached resources
 */
const useCachedResources = (): boolean => {
  const logger = new Logger('Cached Resources');
  const [isLoadingComplete, setLoadingComplete] = useState<boolean>(false);

  useEffect((): void => {
    async function loadResourcesAndDataAsync(): Promise<void> {
      try {
        await SplashScreen.preventAutoHideAsync();

        await Font.loadAsync({
          ...FontAwesome.font
        });
      } catch (e: unknown) {
        logger.warning(`Attention: ${e}`);
      } finally {
        setLoadingComplete(true);
        await SplashScreen.hideAsync();
      }
    }

    loadResourcesAndDataAsync()
      .catch(logger.warning);
  }, []);

  return isLoadingComplete;
};

export default useCachedResources;

import '@assets/css/style.css';
import { View } from '@components/atoms/default';
import ErrorBoundary from '@components/organisms/ErrorBoundary';
import Navigation from '@components/organisms/navigation';
import '@configuration/i18n';
import IocContainer from '@configuration/inversify';
import {
  Poppins_100Thin,
  Poppins_200ExtraLight,
  Poppins_300Light,
  Poppins_400Regular,
  Poppins_500Medium,
  Poppins_600SemiBold,
  Poppins_700Bold,
  useFonts
} from '@expo-google-fonts/poppins';
import useCachedResources from '@hooks/useCachedResources';
import { StatusBar } from 'expo-status-bar';
import { Provider as InversifyProvider } from 'inversify-react';
import { Platform, StyleSheet } from 'react-native';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { SafeAreaProvider } from 'react-native-safe-area-context';

const App = (): JSX.Element | null => {
  const isLoadingComplete = useCachedResources();
  const [fontsLoaded] = useFonts({
    Poppins_100Thin,
    Poppins_300Light,
    Poppins_200ExtraLight,
    Poppins_400Regular,
    Poppins_500Medium,
    Poppins_600SemiBold,
    Poppins_700Bold
  });

  if (!isLoadingComplete || !fontsLoaded) return null;

  return (
    <View style={styles.fullScreen}>
      <SafeAreaProvider>
        <InversifyProvider container={IocContainer}>

          <GestureHandlerRootView style={{flex: 1}}>
              <ErrorBoundary>
                <Navigation />
                <StatusBar />
              </ErrorBoundary>
          </GestureHandlerRootView>
        </InversifyProvider>
      </SafeAreaProvider>
    </View>
  );
};

const styles = StyleSheet.create({
  fullScreen: {
    ...Platform.select({web: {height: '100vh'}, default: {height: '100%'}})
  }
});

export default App;

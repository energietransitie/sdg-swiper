import 'expo/build/Expo.fx';
import { registerRootComponent } from 'expo';
import { createRoot } from 'react-dom/client';
import { AppRegistry, Platform } from 'react-native';
import App from './src/App';

AppRegistry.registerComponent('main', () => registerRootComponent(App));

// Fix for: https://github.com/expo/expo/issues/18485#issuecomment-1311123265
if (Platform.OS === 'web') {
  const root = createRoot(
    document.getElementById('root') ?? document.getElementById('main')
  );
  root.render(<App />);
} else {
  registerRootComponent(App);
}


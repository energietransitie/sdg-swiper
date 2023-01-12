import { DefaultTheme, NavigationContainer } from '@react-navigation/native';
import linking from '@configuration/linking';
import RootNavigation from './Root';

const Navigation = (): JSX.Element => {
  return (
    <NavigationContainer
      linking={linking}
      theme={DefaultTheme}
    >
      <RootNavigation />
    </NavigationContainer>
  );
};

export default Navigation;

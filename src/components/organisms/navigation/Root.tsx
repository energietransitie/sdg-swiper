import type { IRootLinking } from '@configuration/linking';
import { createNativeStackNavigator, NativeStackScreenProps } from '@react-navigation/native-stack';

import NotFoundScreen from '@screens/NotFound';
import SdgScreen from '@screens/Sdg';
import SdgResultScreen from '@screens/SdgResult';

const {Navigator, Screen} = createNativeStackNavigator<IRootLinking>();

const RootNavigation = (): JSX.Element => {
  // Also update these routes in the translation file for metadata
  return (
    <Navigator screenOptions={{headerShown: false}} defaultScreenOptions={{headerShown: false}}>
      <Screen name={'Sdg'} component={SdgScreen} />
      <Screen name={'SdgResult'} component={SdgResultScreen} />
      <Screen name={'NotFound'} component={NotFoundScreen} />
    </Navigator>
  );
};

export type IRootProps<Screen extends keyof IRootLinking> =
  NativeStackScreenProps<IRootLinking, Screen>;

export default RootNavigation;

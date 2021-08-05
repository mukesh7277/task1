/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * Generated with the TypeScript template
 * https://github.com/react-native-community/react-native-template-typescript
 *
 * @format
 */

import 'react-native-gesture-handler';
import React, {useContext} from 'react';
import {StatusBar, View, Platform} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator, TransitionPresets} from '@react-navigation/stack';
import ThemeContext from '@src/context/theme-context';
import TabNavigation from '@src/components/routes/TabNavigation';
import DishDetails from '@src/components/screens/DishDetails';
import SearchDishes from '@src/components/screens/SearchDishes';
import AuthenticationStack from '@src/components/routes/Stacks/AuthenticationStack';
import {lightTheme, darkTheme} from '@src/styles/theme';
// import AuthContext from '@src/context/auth-context';
import {useStore} from '../../stores';
const RootStack = createStackNavigator();

const RootNavigation = () => {
  const store = useStore();
  const {theme} = useContext(ThemeContext);
  const isUserAuthenticated = store.AuthStore.authState != 'AUTHENTICATED';
  const flex = 1;
  const rootContainerBackgroundColor =
    theme === 'light'
      ? lightTheme.colors.background
      : darkTheme.colors.background;
  const screenOptions =
    Platform.OS === 'ios'
      ? {
          ...TransitionPresets.ModalSlideFromBottomIOS,
        }
      : {
          ...TransitionPresets.FadeFromBottomAndroid,
        };

  return (
    <NavigationContainer theme={theme === 'light' ? lightTheme : darkTheme}>
      <View style={{flex, backgroundColor: rootContainerBackgroundColor}}>
        <StatusBar
          backgroundColor={
            theme === 'light'
              ? lightTheme.colors.background
              : darkTheme.colors.background
          }
          barStyle={theme === 'light' ? 'dark-content' : 'light-content'}
        />
        <RootStack.Navigator>
          <RootStack.Screen
            name="Main"
            options={{headerShown: false}}
            component={TabNavigation}
          />
        </RootStack.Navigator>
      </View>
    </NavigationContainer>
  );
};

export default RootNavigation;

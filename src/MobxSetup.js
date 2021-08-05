import 'react-native-gesture-handler';
import React, {useEffect} from 'react';
import {LogBox} from 'react-native';
import App from './App';
import SplashScreen from 'react-native-splash-screen';
import {Store, StoreProvider, useStore} from './stores';

const MobxSetup = () => {
  useEffect(() => {
    LogBox.ignoreAllLogs();
    SplashScreen.hide();
  }, []);

  return (
    <StoreProvider store={Store}>
      <App />
    </StoreProvider>
  );
};
export default MobxSetup;

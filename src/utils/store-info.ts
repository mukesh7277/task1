import {Platform} from 'react-native';

export const getStoreName = () => {
  return Platform.OS === 'android' ? 'Play Store' : 'App Store';
};

export const getStoreURL = () => {
  return 'https://instadukan.com/';
};

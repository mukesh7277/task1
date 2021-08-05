/**
 * @format
 */
import {AppRegistry} from 'react-native';
import MobxSetup from './src/MobxSetup';
import {name as appName} from './app.json';

AppRegistry.registerComponent(appName, () => MobxSetup);

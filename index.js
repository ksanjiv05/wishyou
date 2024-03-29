/**
 * @format
 */

import {AppRegistry, Alert} from 'react-native';
import App from './App';
import messaging from '@react-native-firebase/messaging';
import {name as appName} from './app.json';

messaging().setBackgroundMessageHandler(async remoteMessage => {
  // console.log('Message handled in the background!', remoteMessage);
  Alert.alert(JSON.stringify(remoteMessage));
});

AppRegistry.registerComponent(appName, () => App);

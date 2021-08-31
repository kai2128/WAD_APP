/**
 * @format
 */

import {AppRegistry, LogBox} from 'react-native';
import App from './App';
import {name as appName} from './app.json';

// for request
GLOBAL.XMLHttpRequest = GLOBAL.originalXMLHttpRequest || GLOBAL.XMLHttpRequest;

LogBox.ignoreLogs(['Possible Unhandled Promise Rejection']);
LogBox.ignoreLogs(['If you want to use Reanimated 2']);

AppRegistry.registerComponent(appName, () => App);

/* import { AppRegistry, Platform } from 'react-native';
import App from './App';
import {name as appName} from './app.json';

AppRegistry.registerComponent('main', () => App);

if (Platform.OS === 'web') {
    const rootTag = document.getElementById('root') || document.getElementById('X');
    AppRegistry.runApplication('main', { rootTag });
}

//AppRegistry.registerComponent(appName, () => App); */

/**
 * @format
 */

import {AppRegistry} from 'react-native';
import App from './App';
import {name as appName} from './app.json';

AppRegistry.registerComponent(appName, () => App); 
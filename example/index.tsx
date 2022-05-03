/**
 * @format
 */

import { AppRegistry } from 'react-native';
import App from './app/app';
import { name as appName } from './app.json';
import Config from "react-native-config"
import { setDefaultProps } from "demo-login"
console.log('====================================');
console.log("process", Config.API_URL);
console.log('====================================');
setDefaultProps({ api_url: Config.API_URL, api_login_url: Config.API_LOGIN_URL })
AppRegistry.registerComponent(appName, () => App);

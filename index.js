/**
 * @format
 */

import {AppRegistry} from 'react-native';
import React from 'react';
import App from './App';
import AuthComponent from './src/context/authContext';

import {name as appName} from './app.json';

function AppWithContext(){
    return (<AuthComponent>
        <App/>
    </AuthComponent>)
}

AppRegistry.registerComponent(appName, () => AppWithContext);

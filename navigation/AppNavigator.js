import React from 'react';
import { createAppContainer, createStackNavigator, createSwitchNavigator } from 'react-navigation';

import MainTabNavigator from './MainTabNavigator';
import LoginScreen from '../screens/LoginScreen';
import RegisterScreen from '../screens/RegisterScreen';

//why a stack? well its so we can add other screens if we want in our login process
//test
const LoginNavigator = createStackNavigator({ Login: LoginScreen });

export default createAppContainer(
  createSwitchNavigator({
    App: MainTabNavigator,
    Auth: LoginScreen,
    Register: RegisterScreen,
  },
  {
    initialRouteName: 'App',
  })
);

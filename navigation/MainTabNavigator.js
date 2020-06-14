import React from 'react';
import { Platform } from 'react-native';
import { createStackNavigator, createBottomTabNavigator } from 'react-navigation';

import TabBarIcon from '../components/TabBarIcon';
import HomeScreen from '../screens/HomeScreen';
import ProfileScreen from '../screens/ProfileScreen';
import SettingsScreen from '../screens/SettingsScreen';
import FeedScreen from '../screens/FeedScreen';
import DealInput from '../components/DealInput'

const config = Platform.select({
  web: { headerMode: 'screen' },
  default: {},
});

const FeedStack = createStackNavigator(
  {
    Feed: FeedScreen,
  },
  config
);

FeedStack.navigationOptions = {
  tabBarLabel: 'Feed',
  tabBarIcon: ({ focused }) => (
    <TabBarIcon
      focused={focused}
      name={'ios-home'}
    />
  ),
  tabBarOptions: {
    activeTintColor: 'black',
    inactiveTintColor: 'white',
    style: {
      backgroundColor: '#b5490b',
    },
  }
};

FeedStack.path = '';




const ProfileStack = createStackNavigator(
  {
    Profile: ProfileScreen,
  },
  config
);

ProfileStack.navigationOptions = {
  tabBarLabel: 'Profile',
  tabBarIcon: ({ focused }) => (
    <TabBarIcon focused={focused} name={Platform.OS === 'ios' ? 'ios-contact' : 'md-contact'} />
  ),
  tabBarOptions: {
    activeTintColor: 'black',
    inactiveTintColor: 'white',
    style: {
      backgroundColor: '#b5490b',
    },
  }
};

ProfileStack.path = '';

const SettingsStack = createStackNavigator(
  {
    Settings: SettingsScreen,
  },
  config
);

SettingsStack.navigationOptions = {
  tabBarLabel: 'Settings',
  tabBarIcon: ({ focused }) => (
    <TabBarIcon focused={focused} name={Platform.OS === 'ios' ? 'ios-options' : 'md-options'} />
  ),
  tabBarOptions: {
    activeTintColor: 'black',
    inactiveTintColor: 'white',
    style: {
      backgroundColor: '#b5490b',
    },
  }
};

SettingsStack.path = '';

const tabNavigator = createBottomTabNavigator({
  FeedStack,
  ProfileStack,
  SettingsStack,

});

tabNavigator.path = '';

export default tabNavigator;

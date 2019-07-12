import React from 'react';
import { Platform } from 'react-native';
import { createStackNavigator, createBottomTabNavigator } from 'react-navigation';

import TabBarIcon from '../components/TabBarIcon';
import HomeScreen from '../screens/HomeScreen';
import LinksScreen from '../screens/LinksScreen';
import SettingsScreen from '../screens/SettingsScreen';
import SearchScreen from '../screens/SearchScreen';
import MyRideScreen from "../screens/MyRideScreen";
import SearchForGroup from "../components/hacks/SearchForGroup"

const config = Platform.select({
  web: { headerMode: 'screen' },
  default: {},
});

const MyRideStack = createStackNavigator(
  {
    MyRide: MyRideScreen,
  },
  config
);

MyRideStack.navigationOptions = {
  tabBarLabel: "My Ride",
  tabBarIcon: ({ focused }) => (
    <TabBarIcon
      focused={focused}
      name={ 'ios-car' }
    />
  ),
};

MyRideStack.path = '';

const SearchStack = createStackNavigator(
  {
    Search: SearchForGroup,
  },
  config
);

SearchStack.navigationOptions = {
  tabBarLabel: 'Search',
  tabBarIcon: ({ focused }) => (
    <TabBarIcon
      focused={focused}
      name={ 'md-information-circle' }
    />
  ),
};

SearchStack.path = '';

const HomeStack = createStackNavigator(
  {
    Home: HomeScreen,
  },
  config
);

HomeStack.navigationOptions = {
  tabBarLabel: 'Home',
  tabBarIcon: ({ focused }) => (
    <TabBarIcon
      focused={focused}
      name={
        Platform.OS === 'ios'
          ? `ios-information-circle${focused ? '' : '-outline'}`
          : 'md-information-circle'
      }
    />
  ),
};

HomeStack.path = '';

const LinksStack = createStackNavigator(
  {
    Links: LinksScreen,
  },
  config
);

LinksStack.navigationOptions = {
  // tabBarLabel: 'Links',
  tabBarLabel: "Groups",
  tabBarIcon: ({ focused }) => (
    <TabBarIcon focused={focused} name={Platform.OS === 'ios' ? 'ios-link' : 'md-link'} />
  ),
};

LinksStack.path = '';

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
};

SettingsStack.path = '';

const tabNavigator = createBottomTabNavigator({
	// HomeStack,
	MyRideStack,
	LinksStack,
	SettingsStack,
  SearchStack

});

tabNavigator.path = '';

export default tabNavigator;

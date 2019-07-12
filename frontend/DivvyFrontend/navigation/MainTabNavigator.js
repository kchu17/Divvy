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
import GroupDetailsScreen from "../screens/GroupDetailsScreen";

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
    GroupDetailsScreen: {screen: GroupDetailsScreen}
  },
  config
);

SearchStack.navigationOptions = {
  tabBarLabel: 'Search',
  tabBarIcon: ({ focused }) => (
    <TabBarIcon
      focused={focused}
      name={ 'ios-search' }
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

const GroupsStack = createStackNavigator(
  {
    Groups: GroupDetailsScreen,
  },
  config
);

GroupsStack.navigationOptions = {
  // tabBarLabel: 'Links',
  tabBarLabel: "Groups",
  tabBarIcon: ({ focused }) => (
    // <TabBarIcon focused={focused} name={Platform.OS === 'ios' ? 'ios-groups' :'md-groups'} />
    <TabBarIcon focused={focused} name={'ios-contact'}/>
  ),
};

GroupsStack.path = '';

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
	GroupsStack,
	SettingsStack,
  SearchStack

});

tabNavigator.path = '';

export default tabNavigator;

import React, {Component} from 'react';

// import TabNavigator from 'react-navigation-tabs';
import {createBottomTabNavigator} from 'react-navigation-tabs';

import {Factory} from 'native-base';
import {Icon} from 'react-native-elements';
// Tabs
import HomePage from '../page/home';
import ProfileStack from '../page/profile';
import TicketStack from '../page/ticket';

const NIcon = Factory(Icon);

export default createBottomTabNavigator(
  {
    HomePage: {
      screen: HomePage,
      navigationOptions: {
        title: 'Home',
        tabBarLabel: 'Home',
        // tabBarOptions: {
        //   activeTintColor: '#111827',
        //   inactiveTintColor: '#9ca3af',
        // },
        tabBarIcon: ({tintColor}) => {
          return <NIcon type={'Entypo'} name={'home'} color={tintColor} />;
        },
      },
    },
    TicketStack: {
      screen: TicketStack,
      navigationOptions: {
        title: 'Ticket',
        tabBarLabel: 'Ticket',
        // tabBarOptions: {
        //   activeTintColor: '#111827',
        //   inactiveTintColor: '#9ca3af',
        // },
        tabBarIcon: ({tintColor}) => {
          return (
            <NIcon type={'font-awesome'} name={'ticket'} color={tintColor} />
          );
        },
      },
    },
    ProfileStack: {
      screen: ProfileStack,
      navigationOptions: {
        title: 'Profile',
        tabBarLabel: 'Profile',
        // tabBarOptions: {
        //   activeTintColor: '#111827',
        //   inactiveTintColor: '#9ca3af',
        // },
        tabBarIcon: ({tintColor}) => {
          return (
            <NIcon type={'font-awesome'} name={'user'} color={tintColor} />
          );
        },
      },
    },
  },
  {
    initialRouteName: 'HomePage',
    defaultNavigationOptions: ({navigation}) => ({
      // only show tab bar on the first page of stack
      tabBarVisible: navigation.state.index > 0 ? false : true,
    }),
    tabBarOptions: {
      activeTintColor: '#111827',
      inactiveTintColor: '#9ca3af',
      style: {
        // height: 50,
      },
    },
  },
);

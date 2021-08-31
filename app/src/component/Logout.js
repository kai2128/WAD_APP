import React, {Component} from 'react';
import {Alert} from 'react-native';
import storage from '../util/storage';
import {NavigationActions} from 'react-navigation';

export default navigation => {
  return Alert.alert('Logout', 'Are you sure to logout?', [
    {text: 'Yes', onPress: () => logout(navigation)},
    {
      text: 'No',
      onPress: () => {},
    },
  ]);
};

const logout = navigation => {
  // delete logged in info
  (async () => {
    await storage.delete('userInfo');
  })();
  navigation.navigate(
    'WelcomeStack',
    {},

    // back to welcome page
    NavigationActions.navigate({routeName: 'Welcome'}),
  );
};

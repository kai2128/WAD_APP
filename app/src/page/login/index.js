import React, {Component} from 'react';
import {Center, Image, VStack} from 'native-base';

import AppButton from '../../component/AppButton';
import {pxSize} from '../../util/pxSize';

import Login from './Login';
import {createStackNavigator} from 'react-navigation-stack';
import Register from './Register';
import storage from '../../util/storage';

function renderBackground(imageOpacity, imageBlur) {
  return (
    <Image
      position={'absolute'}
      opacity={imageOpacity}
      left={0}
      top={0}
      w={pxSize(375)}
      h={pxSize(812)}
      source={require('../../resources/img/login-background.jpg')}
      alt={'backgroundImage'}
      blurRadius={imageBlur}
    />
  );
}

class Welcome extends Component {
  // if user is logged in, jump to home screen
  componentDidMount = async () => {
    const isLoggedIn = await storage.find('userInfo');
    if (isLoggedIn) {
      this.props.navigation.navigate('MainTab');
    }
  };

  render() {
    return (
      <Center flex={1}>
        {renderBackground(0.8, 1)}
        <Center flex={2} px={50}>
          <Image
            resizeMode={'contain'}
            source={require('../../resources/img/app_icon.png')}
            alt={'App icon'}
          />
        </Center>
        <VStack space={10} flex={1}>
          <AppButton
            title={'Login'}
            onPress={() => {
              this.props.navigation.navigate('Login', {renderBackground});
            }}
          />
          <AppButton
            title={'Register'}
            onPress={() => {
              this.props.navigation.navigate('Register', {renderBackground});
            }}
          />
        </VStack>
      </Center>
    );
  }
}

const WelcomeStack = createStackNavigator(
  {
    // subpage
    Welcome: {
      screen: Welcome,
    },
    Login: {
      screen: Login,
    },
    Register: {
      screen: Register,
    },
  },
  {
    initialRouteName: 'Welcome',
    mode: 'modal',
    headerMode: 'none',
  },
);

export default WelcomeStack;

import React, {Component} from 'react';
import {Alert} from 'react-native';
import {Box, Factory, Input, VStack} from 'native-base';

import {Icon} from 'react-native-elements';
import AppButton from '../../component/AppButton';
import PageHeader from '../../component/PageHeader';

import request from '../../util/request';
import storage from '../../util/storage';
import {USER_LOGIN} from '../../util/pathMap';
import Loader, {loading} from '../../component/Loader';

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      password: '',
      email: '',
    };
  }

  handleLogin = async () => {
    const {password, email} = this.state;

    // does not post to server if data is empty
    if (!password || !email) {
      if (!password && !email) {
        alert('Email and password is empty.');
      } else if (!password) {
        alert('Password is empty.');
      } else {
        alert('Email is empty');
      }
      return;
    }

    try {
      loading.show('Requesting');
      const res = await request.post(USER_LOGIN, {
        email: email,
        password: password,
      });
      const result = await res.data;
      await loading.dismiss();
      if (result.status != 200) {
        Alert.alert(null, 'Username or password does not match.');
        console.log(result);
        return;
      }

      // store user data into db
      await storage.insert(
        'userInfo',
        JSON.stringify({
          email: email,
          username: result.data.username,
          token: result.data.token,
          uid: result.data._id,
        }),
      );

      Alert.alert(
        null,
        'Logged in.',
        this.props.navigation.navigate('HomePage'),
      );
      // this.props.navigation.navigate('HomePage');
    } catch (err) {
      console.log(err);
    }
  };

  // Login View
  render() {
    const NIcon = Factory(Icon);
    const {password, email} = this.state;
    const {renderBackground} = this.props.navigation.state.params;
    return (
      <Box flex={1} alignItems={'center'}>
        {renderBackground(0.3, 5)}
        <PageHeader
          onPress={() => {
            return this.props.navigation.goBack();
          }}
          title={'Login'}
        />
        <VStack space={7} w={'90%'} my={10}>
          <Input
            bg={'white'}
            variant={'rounded'}
            InputLeftElement={
              <NIcon name={'user'} type={'font-awesome'} ml={4} />
            }
            placeholder={'Email'}
            value={email}
            onChangeText={text =>
              this.setState({
                email: text,
              })
            }
          />
          <Input
            variant={'rounded'}
            bg={'white'}
            InputLeftElement={
              <NIcon name={'lock'} type={'font-awesome'} ml={4} />
            }
            placeholder={'Password'}
            secureTextEntry={true}
            value={password}
            onChangeText={text =>
              this.setState({
                password: text,
              })
            }
          />
          <AppButton title={'Login'} onPress={this.handleLogin} />
        </VStack>
        <Loader />
      </Box>
    );
  }
}

export default Login;

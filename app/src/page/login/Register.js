import React, {Component} from 'react';
import {Alert, Keyboard, TouchableWithoutFeedback} from 'react-native';
import {
  Center,
  FormControl,
  Input,
  KeyboardAvoidingView,
  VStack,
} from 'native-base';

import AppButton from '../../component/AppButton';
import PageHeader from '../../component/PageHeader';

import request from '../../util/request';
import {EMAIL_CHECK, USER_REGISTER} from '../../util/pathMap';
import validator from '../../util/validator';
import Loader, {loading} from '../../component/Loader';

class Register extends Component {
  constructor(props) {
    super(props);
    this.state = {
      formData: {},
      errors: {},
    };
  }

  setError(params) {
    this.setState({
      errors: {
        ...this.state.errors,
        ...params,
      },
    });
  }

  resetError() {
    this.setState({
      errors: {},
    });
  }

  handleRegister = async () => {
    const {password, email, username} = this.state.formData;
    let error = {};
    this.resetError();
    if (!password || !email || !username) {
      if (!password) {
        error.password = 'Password is required';
      }

      if (!email) {
        error.email = 'Email is required';
      }

      if (!username) {
        error.username = 'Username is required';
      }

      this.setError(error);
      return;
    }

    if (!validator.validatePassword(password)) {
      error.password =
        'Password format is incorrect, contains alphanumeric between 5 - 20 character';
    }

    if (!validator.validateEmail(email)) {
      error.email = 'Email format is incorrect';
    }

    if (!validator.validateUsername(username)) {
      error.username =
        'username format is incorrect, contains alphanumeric between 5 - 10 character';
    }

    if (Object.keys(error).length > 0) {
      this.setError(error);
      return;
    }

    try {
      loading.show('Requesting');
      const res = await request.post(USER_REGISTER, {
        password,
        email,
        username,
      });
      const result = await res.data;
      await loading.dismiss();
      if (result.status != 200) {
        Alert.alert(null, 'Failed to register!');
        console.log(result.status);
        return;
      }
      Alert.alert(null, 'Register success!');
      this.props.navigation.goBack();
    } catch (err) {
      console.log(err);
    }
  };

  async checkEmail(email) {
    const res = await request.get(EMAIL_CHECK + '/' + email);
    const data = await res.data;
    if (data.status != 200) {
      this.setError({email: res.data.msg});
    } else {
      this.resetError();
    }
  }

  // register view
  render() {
    // const {name, password, phone, email, username} = this.state;
    const {errors} = this.state;
    const {renderBackground} = this.props.navigation.state.params;
    return (
      <>
        {renderBackground(0.15, 5)}
        <Center>
          <Loader />
          <PageHeader
            onPress={() => {
              return this.props.navigation.goBack();
            }}
            title={'Register'}
          />
          <KeyboardAvoidingView>
            <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
              <VStack space={10} w={'90%'}>
                <VStack space={5}>
                  {/*username input*/}
                  <FormControl isRequired isInvalid={'username' in errors}>
                    <FormControl.Label _text={{bold: true}}>
                      Username
                    </FormControl.Label>
                    <Input
                      bg={'white'}
                      onChangeText={text =>
                        this.setState({
                          formData: {...this.state.formData, username: text},
                        })
                      }
                    />
                    {'username' in errors ? (
                      <FormControl.ErrorMessage>
                        {errors.username}
                      </FormControl.ErrorMessage>
                    ) : (
                      <FormControl.HelperText>
                        5-10 alphanumeric
                      </FormControl.HelperText>
                    )}
                  </FormControl>
                  {/*email input*/}
                  <FormControl isRequired isInvalid={'email' in errors}>
                    <FormControl.Label _text={{bold: true}}>
                      Email
                    </FormControl.Label>
                    <Input
                      bg={'white'}
                      onChangeText={text => {
                        this.setState({
                          formData: {...this.state.formData, email: text},
                        });
                        this.checkEmail(text);
                      }}
                    />
                    {'email' in errors && (
                      <FormControl.ErrorMessage>
                        {errors.email}
                      </FormControl.ErrorMessage>
                    )}
                  </FormControl>

                  {/*password input*/}
                  <FormControl isRequired isInvalid={'password' in errors}>
                    <FormControl.Label _text={{bold: true}}>
                      Password
                    </FormControl.Label>
                    <Input
                      secureTextEntry={true}
                      bg={'white'}
                      onChangeText={text =>
                        this.setState({
                          formData: {...this.state.formData, password: text},
                        })
                      }
                    />
                    {'password' in errors ? (
                      <FormControl.ErrorMessage>
                        {errors.password}
                      </FormControl.ErrorMessage>
                    ) : (
                      <FormControl.HelperText>
                        5-20 alphanumeric, underscore
                      </FormControl.HelperText>
                    )}
                  </FormControl>
                </VStack>
                <AppButton
                  title={'Register'}
                  onPress={this.handleRegister.bind(this)}
                  ref={this.state.button}
                />
              </VStack>
            </TouchableWithoutFeedback>
          </KeyboardAvoidingView>
        </Center>
      </>
    );
  }
}

export default Register;

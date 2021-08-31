import React, {Component} from 'react';
import ProfileHeader from '../component/Header';
import {
  Box,
  Input,
  KeyboardAvoidingView,
  ScrollView,
  Text,
  VStack,
} from 'native-base';
import storage from '../../../util/storage';
import {changePassword} from '../service';
import {Alert, Platform} from 'react-native';
import AppButton from '../../../component/AppButton';

class Index extends Component {
  constructor(props) {
    super(props);

    this.state = {
      email: '',
      username: '',
      oldPassword: '',
      newPassword: '',
      confirmPassword: '',
    };
  }

  componentDidMount = async () => {
    const userInfo = await storage.find('userInfo');
    this.setState({
      email: userInfo.email,
      username: userInfo.username,
    });
  };

  handleChangePassword = async () => {
    const {oldPassword, newPassword, confirmPassword} = this.state;

    this.setState({
      error: false,
    });

    if (newPassword !== confirmPassword) {
      Alert.alert('', 'New Passwords are not the same');
      this.setState({
        error: true,
      });
      return;
    }

    const result = await changePassword(oldPassword, newPassword);
    if (result.status != 200) {
      Alert.alert('Old Password is incorrect');
      return;
    }

    Alert.alert('Password updated!');
    this.setState({oldPassword: '', newPassword: '', confirmPassword: ''});
  };

  render() {
    const {email, username, oldPassword, newPassword, confirmPassword, error} =
      this.state;
    return (
      <>
        <ProfileHeader
          title={'Profile Settings'}
          onPress={() => this.props.navigation.goBack()}
        />
        <KeyboardAvoidingView flex={1}>
          <ScrollView>
            <VStack mx={3} space={4} my={5}>
              <Box>
                <Text fontWeight={700}>Email</Text>
                <Input value={email} isReadOnly={true} />
              </Box>

              <Box>
                <Text fontWeight={700}>Username</Text>
                <Input value={username} isReadOnly={true} />
              </Box>

              <Box>
                <Text fontWeight={700}>Change Password</Text>
                <VStack>
                  <Input
                    InputLeftElement={
                      <Text ml={4} flex={1}>
                        Old Password:{' '}
                      </Text>
                    }
                    secureTextEntry={true}
                    onChangeText={text => this.setState({oldPassword: text})}
                  />

                  <Input
                    InputLeftElement={
                      <Text ml={4} flex={1}>
                        New Password:{' '}
                      </Text>
                    }
                    value={newPassword}
                    isDisabled={!oldPassword}
                    _disabled={{bg: 'primary.300'}}
                    secureTextEntry={true}
                    onChangeText={text => this.setState({newPassword: text})}
                  />

                  <Input
                    isInvalid={error}
                    InputLeftElement={
                      <Text ml={4} flex={1}>
                        Confirm Password:{' '}
                      </Text>
                    }
                    value={confirmPassword}
                    secureTextEntry={true}
                    _disabled={{bg: 'primary.300'}}
                    isDisabled={!newPassword}
                    onChangeText={text =>
                      this.setState({confirmPassword: text})
                    }
                  />
                </VStack>
              </Box>
            </VStack>
            <AppButton
              title={'Change Password'}
              attr={{isDisabled: !confirmPassword}}
              onPress={this.handleChangePassword}
            />
          </ScrollView>
        </KeyboardAvoidingView>
      </>
    );
  }
}

export default Index;

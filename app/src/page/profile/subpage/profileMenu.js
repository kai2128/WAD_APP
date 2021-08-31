import React, {Component} from 'react';
import ProfileHeader from '../component/Header';
import {Button, Text, VStack} from 'native-base';
import ProfileButton from '../component/ProfileButton';
import Logout from '../../../component/Logout';

class Index extends Component {
  render() {
    const {navigation} = this.props;
    return (
      <>
        <ProfileHeader onPress={() => Logout(navigation)} />
        <VStack space={3} bg={'coolGray.300'}>
          <VStack space={1} bg={'#F2F2F2'}>
            <ProfileButton label={'View Ticket'} onPress={() => navigation.navigate('ViewTicketPage')} />
            <ProfileButton label={'Ticket History'} onPress={() => navigation.navigate('TicketHistoryPage')} />
          </VStack>
          <VStack space={1} bg={'#F2F2F2'}>
            <ProfileButton
              label={'Contact Us'}
              onPress={() => navigation.navigate('ContactUsPage')}
            />
            <ProfileButton
              label={'About Us'}
              onPress={() => navigation.navigate('AboutUsPage')}
            />
          </VStack>
          <VStack space={1} bg={'#F2F2F2'}>
            <ProfileButton label={'Profile settings'} onPress={() => navigation.navigate('ProfileSettingPage')} />
            <ProfileButton
              label={'Logout'}
              textColor={'rose.700'}
              onPress={() => Logout(this.props.navigation)}
            />
          </VStack>
        </VStack>
      </>
    );
  }
}

export default Index;

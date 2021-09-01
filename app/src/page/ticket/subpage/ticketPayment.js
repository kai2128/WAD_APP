import React, {Component} from 'react';
import {Alert, Button, Text, TextInput, View, StyleSheet} from 'react-native';
import {Icon} from 'react-native-elements';
import BottomButton from '../../../component/BottomButton';
import PageHeader from '../../../component/PageHeader';
import {
  Box,
  Heading,
  HStack,
  KeyboardAvoidingView,
  ScrollView,
  VStack,
} from 'native-base';
import Loader, {loading} from '../../../component/Loader';
import {NavigationActions, StackActions} from 'react-navigation';
import {createTicket} from '../service';
import AppButton from '../../../component/AppButton';

const backToHomePage = StackActions.reset({
  index: 0,
  actions: [NavigationActions.navigate({routeName: 'MainTab'})],
});

class Index extends Component {
  constructor(props) {
    super(props);
    this.state = {
      schedule: this.props.navigation.getParam('schedule'),
      newTicket: this.props.navigation.getParam('newTicket'),
      amount: this.props.navigation.getParam('amount'),
      holdername: '',
      cnum: '',
      cnum2: '',
      cnum3: '',
      cnum4: '',
      month: '',
      year: '',
      cvv: '',
    };
  }

  payHandler = async () => {
    let {cnum, cnum2, cnum3, cnum4, schedule, newTicket} = this.state;
    const {navigation} = this.props;
    const bankCard = `${cnum}-${cnum2}-${cnum3}-${cnum4}`;
    newTicket.bankCard = bankCard;

    const randTime = Math.floor(Math.random() * 5000);
    const res = await createTicket(schedule, newTicket);
    if (res.status == 200) {
      loading.show('Contacting with bank', randTime);
      setTimeout(() => {
        Alert.alert('', 'Payment success! Ticket Booked.', [
          {text: 'Ok', onPress: () => navigation.dispatch(backToHomePage)},
        ]);
      }, randTime);
    } else {
      Alert.alert('', 'Failed, please try again', [
        {text: 'Ok', onPress: () => navigation.dispatch(backToHomePage)},
      ]);
    }
  };

  render() {
    const {amount, holdername, cnum, cnum2, cnum3, cnum4, month, year, cvv} =
      this.state;
    return (
      <>
        <PageHeader
          onPress={() => this.props.navigation.goBack()}
          title={'Payment'}
        />
        <VStack mx={5} flex={1}>
          <Heading size={'md'}>4. Payment</Heading>
          <KeyboardAvoidingView>
            <ScrollView>
              <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                  width: '25%',
                  marginTop: 3,
                }}>
                <Icon type={'font-awesome'} name={'cc-visa'} />
                <Icon type={'font-awesome'} name={'cc-mastercard'} />
              </View>

              <View style={styles.view}>
                <Text style={styles.font1}>Total amount</Text>
                <Text style={styles.price}>{'RM ' + amount.toFixed(2)}</Text>
              </View>

              <View style={styles.view}>
                <Text style={styles.font1}>Card holder name</Text>
                <TextInput
                  style={styles.borderstyle}
                  value={holdername}
                  maxLength={4}
                  placeholder={'Name'}
                  onChangeText={text => this.setState({holdername: text})}
                />
              </View>

              <View style={styles.view}>
                <Text style={styles.font1}>Card number</Text>
                <View
                  style={[
                    styles.cardview,
                    {justifyContent: 'space-between', alignItems: 'center'},
                  ]}>
                  <TextInput
                    style={styles.borderstyle}
                    value={cnum}
                    maxLength={4}
                    textContentType={'creditCardNumber'}
                    placeholder={'1234'}
                    onChangeText={text => this.setState({cnum: text})}
                  />
                  <Text style={{fontSize: 30, color: '#9ca3af'}}>-</Text>
                  <TextInput
                    style={styles.borderstyle}
                    value={cnum2}
                    textContentType={'creditCardNumber'}
                    maxLength={4}
                    placeholder={'1234'}
                    onChangeText={text => this.setState({cnum2: text})}
                  />
                  <Text style={{fontSize: 30, color: '#9ca3af'}}>-</Text>
                  <TextInput
                    style={styles.borderstyle}
                    value={cnum3}
                    textContentType={'creditCardNumber'}
                    maxLength={4}
                    placeholder={'1234'}
                    onChangeText={text => this.setState({cnum3: text})}
                  />
                  <Text style={{fontSize: 30, color: '#9ca3af'}}>-</Text>
                  <TextInput
                    style={styles.borderstyle}
                    value={cnum4}
                    textContentType={'creditCardNumber'}
                    placeholder={'1234'}
                    onChangeText={text => this.setState({cnum4: text})}
                  />
                </View>
              </View>

              <View style={styles.view}>
                <Text style={styles.font1}>Expiration date</Text>
                <View style={styles.cardview}>
                  <TextInput
                    style={[styles.borderstyle, {marginRight: 10}]}
                    value={month}
                    placeholder={'MM'}
                    maxLength={2}
                    onChangeText={text => this.setState({month: text})}
                  />
                  <Text style={{fontSize: 30, color: '#9ca3af'}}>/</Text>
                  <TextInput
                    style={[styles.borderstyle, {marginLeft: 10}]}
                    value={year}
                    placeholder={'YYYY'}
                    maxLength={4}
                    onChangeText={text => this.setState({year: text})}
                  />
                </View>
              </View>

              <View style={styles.view}>
                <Text style={styles.font1}>CVV</Text>
                <View style={styles.cardview}>
                  <TextInput
                    style={styles.borderstyle}
                    value={cvv}
                    maxLength={3}
                    onChangeText={text => this.setState({cvv: text})}
                  />
                  <Text style={{paddingTop: 15, color: '#9ca3af'}}>
                    {' '}
                    3 digit code
                  </Text>
                </View>
              </View>
            </ScrollView>
          </KeyboardAvoidingView>
          <Box my={3}>
            <AppButton title={'Pay'} onPress={this.payHandler} />
          </Box>
          <Loader />
        </VStack>
      </>
    );
  }
}

const styles = StyleSheet.create({
  borderstyle: {
    borderWidth: 1,
    borderRadius: 4,
    borderColor: 'grey',
    paddingHorizontal: 10,
    paddingVertical: 8,
    backgroundColor: '#f9fafb',
  },

  view: {
    marginVertical: 10,
  },

  cardview: {
    flexDirection: 'row',
  },

  price: {
    fontSize: 30,
    fontWeight: 'bold',
    color: '#34d399',
  },

  font1: {
    fontWeight: 'bold',
  },
});

export default Index;

import React, {Component} from 'react';
import AppButton from '../../../component/AppButton';
import PageHeader from '../../../component/PageHeader';
import {
  Box,
  Button,
  Divider,
  Heading,
  HStack,
  IconButton,
  Text,
  VStack,
} from 'native-base';
import {Icon} from 'react-native-elements';
import {fontWeight} from 'styled-system';
import {pxSize} from '../../../util/pxSize';

export default class Index extends Component {
  constructor(props) {
    super(props);
    const schedule = this.props.navigation.getParam('schedule', {});
    // console.log(schedule);
    this.state = {
      adult: 0,
      student: 0,
      children: 0,
      total: 0,
      schedule: schedule,
    };
  }

  handleAddMinus(operation, ticket) {
    let {adult, student, children} = this.state;
    let operate = 0;
    if (operation == '+') {
      operate = 1;
    } else {
      operate = -1;
    }
    switch (ticket) {
      case 'adult':
        adult += operate;
        break;
      case 'student':
        student += operate;
        break;
      case 'children':
        children += operate;
        break;
    }
    let total = adult * 20 + children * 5 + student * 15;
    this.setState({adult, children, student, total});
  }

  handleSelectTicket() {
    const {adult, children, student, total, schedule} = this.state;
    const totalTicket = adult + children + student;
    const ticketDetails = {
      totalPrice: total,
      totalTicket: totalTicket,
      adult: adult,
      children: children,
      student: student,
    };
    console.log(ticketDetails);
    console.log(schedule);

    // To select seat page
    this.props.navigation.navigate('SelectSeatPage', {
      ticketDetails: ticketDetails,
      schedule: schedule,
    });
  }

  render() {
    const {adult, children, student, total} = this.state;
    return (
      <>
        <PageHeader
          title={'Select Ticket'}
          onPress={() => this.props.navigation.goBack()}
        />
        <VStack space={5} mx={5}>
          <Heading size={'md'}>1. Select Number of Tickets</Heading>
          <HStack justifyContent={'space-between'}>
            <Box>
              <Heading>Adult</Heading>
              <Text>RM 20</Text>
            </Box>

            {/*Adult ticket selection*/}
            <HStack alignItems={'center'} space={4}>
              <IconButton
                isDisabled={adult <= 0}
                onPress={() => {
                  this.handleAddMinus('-', 'adult');
                }}
                variant={'outline'}
                rounded={100}
                icon={<Icon name={'minus'} type={'ant-design'} />}
              />
              <Text w={5} textAlign={'center'}>
                {adult}
              </Text>
              <IconButton
                onPress={() => {
                  this.handleAddMinus('+', 'adult');
                }}
                variant={'outline'}
                rounded={100}
                icon={<Icon name={'plus'} type={'ant-design'} />}
              />
            </HStack>
          </HStack>
          <Divider />

          {/*Student ticket selection*/}
          <HStack justifyContent={'space-between'} space={4}>
            <Box>
              <Heading>Student</Heading>
              <Text>RM 15</Text>
            </Box>
            <HStack alignItems={'center'} space={4}>
              <IconButton
                isDisabled={student <= 0}
                onPress={() => {
                  this.handleAddMinus('-', 'student');
                }}
                variant={'outline'}
                rounded={100}
                icon={<Icon name={'minus'} type={'ant-design'} />}
              />
              <Text w={5} textAlign={'center'}>
                {student}
              </Text>
              <IconButton
                onPress={() => {
                  this.handleAddMinus('+', 'student');
                }}
                variant={'outline'}
                rounded={100}
                icon={<Icon name={'plus'} type={'ant-design'} />}
              />
            </HStack>
          </HStack>
          <Divider />

          {/*Children ticket selection*/}
          <HStack justifyContent={'space-between'}>
            <Box>
              <Heading>Children</Heading>
              <Text>RM 5</Text>
            </Box>
            <HStack alignItems={'center'} space={4}>
              <IconButton
                onPress={() => {
                  this.handleAddMinus('-', 'children');
                }}
                isDisabled={children <= 0}
                variant={'outline'}
                rounded={100}
                icon={<Icon name={'minus'} type={'ant-design'} />}
              />
              <Text w={5} textAlign={'center'}>
                {children}
              </Text>
              <IconButton
                onPress={() => {
                  this.handleAddMinus('+', 'children');
                }}
                variant={'outline'}
                rounded={100}
                icon={<Icon name={'plus'} type={'ant-design'} />}
              />
            </HStack>
          </HStack>
          <HStack space={215} mt={10}>
            <Text>Total</Text>
            <Text fontSize={'lg'}>{'RM ' + total}</Text>
          </HStack>
        </VStack>
        <Box
          position="absolute"
          bottom={0}
          h={pxSize(80)}
          alignSelf={'center'}
          w={'100%'}>
          <AppButton
            title={'Next'}
            onPress={this.handleSelectTicket.bind(this)}
          />
        </Box>
      </>
    );
  }
}

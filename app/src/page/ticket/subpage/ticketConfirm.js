import React, {Component} from 'react';
import PageHeader from '../../../component/PageHeader';
import AppButton from '../../../component/AppButton';
import TicketDetails from '../../../component/ticketDetails';
import {Heading, ScrollView, VStack} from 'native-base';

class Index extends Component {
  constructor(props) {
    super(props);
    const newTicket = this.props.navigation.getParam('newTicket');
    const schedule = this.props.navigation.getParam('schedule');
    console.log('Ticket confirm' + newTicket);
    console.log('Ticket confirm' + schedule);
    this.state = {
      newTicket: newTicket,
      schedule: schedule,
      ticketDetails: {
        movieTitle: schedule.movieTitle,
        imgSRC: schedule.localImage,
        info: {
          price: newTicket.price,
          location: schedule.cinemaName,
          date: schedule.date,
          time: schedule.startTime,
          number: newTicket.totalTicket,
          seat: newTicket.seatSelected.toString(),
        },
      },
    };
  }

  goToPayment = () => {
    const {newTicket, schedule} = this.state;
    this.props.navigation.navigate('TicketPaymentPage', {
      newTicket: newTicket,
      schedule: schedule,
      amount: newTicket.totalPrice,
    });
  };

  render() {
    return (
      <>
        <PageHeader
          title={'Confirm Ticket'}
          onPress={() => this.props.navigation.goBack()}
        />
        <VStack space={5} flex={1} mb={5}>
          <Heading mx={5} size={'md'}>
            4. Confirm Ticket Details
          </Heading>
          <TicketDetails ticketDetails={this.state.ticketDetails} />
          <AppButton title={'Proceed to Payment'} onPress={this.goToPayment} />
        </VStack>
      </>
    );
  }
}

export default Index;

import React, {Component} from 'react';
import PageHeader from '../../../component/PageHeader';
import {Box, Heading, HStack, SimpleGrid, Text, VStack} from 'native-base';
import {pxSize} from '../../../util/pxSize';
import AppButton from '../../../component/AppButton';
import Seat from '../component/Seat';
import BottomButton from '../../../component/BottomButton';
import storage from '../../../util/storage';

class Index extends Component {
  constructor(props) {
    super(props);
    const schedule = this.props.navigation.getParam('schedule', {});
    const ticketDetails = this.props.navigation.getParam('ticketDetails', {});
    this.state = {
      schedule: schedule, // POST
      seatData: schedule.seat, // use to render
      updatedSeatData: JSON.parse(JSON.stringify(schedule.seat)), // use to record selected seat POST
      seatSelected: [], // user selected seat id
      ticketDetails: ticketDetails, // from user selection

      columnLabel: [1, 2, 3, 4, 5, 6, 7, 8],
      rowLabel: ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H'],
    };
  }

  // new ticket is data to be post to server
  toConfirmTicketPage = async () => {
    const {schedule, updatedSeatData, seatSelected, ticketDetails} = this.state;
    const userInfo = await storage.find('userInfo');
    let newTicket = {
      movieTitle: schedule.movieTitle,
      userId: userInfo.uid,
      schedule: schedule._id,
      bankCard: '', // to be fill in payment page
      totalPrice: ticketDetails.totalPrice * 1.06, // after calculate sst
      price: ticketDetails.totalPrice, // haven't calculate sst
      ticketSelected: {
        adult: ticketDetails.adult,
        children: ticketDetails.children,
        student: ticketDetails.student,
      },
      totalTicket: ticketDetails.totalTicket,
      seatSelected: seatSelected,
      seat: updatedSeatData,
    };

    console.log('Select seat: ' + newTicket);

    // to ticket confirmation page
    this.props.navigation.navigate('TicketConfirmPage', {
      newTicket: newTicket,
      schedule: schedule,
    });
  };

  // * HANDLE SEAT START
  renderSeats = seatArr => {
    return Object.entries(seatArr).map((v, i) => (
      <HStack justifyContent={'center'} key={i}>
        {this.renderSingleRow(v[0], v[1])}
      </HStack>
    ));
  };

  // in: A1
  // action -> set state
  selectSeatHandler = seatId => {
    let {updatedSeatData, seatSelected} = this.state;
    let rows = seatId.substr(0, 1); // A
    let column = seatId.substr(1) - 1; // 1 - 1 = 0

    if (updatedSeatData[rows][column] == 1) {
      // select seat
      updatedSeatData[rows][column] = 0;
      seatSelected.push(seatId);
    } else {
      // deselect seat
      updatedSeatData[rows][column] = 1;
      seatSelected = seatSelected.filter(seat => seat != seatId);
    }
    this.setState({
      updatedSeatData: {...updatedSeatData},
      seatSelected: seatSelected,
    });
  };

  renderSingleRow = (rowName, row) => {
    let view = [];
    let count = 1; // reset count after each row
    const halfLength = Math.ceil(row.length / 2);
    for (let availability of row) {
      if (count - 1 == halfLength) {
        view.push(<Box key={count + rowName} w={pxSize(38)} />);
      }
      view.push(this.renderSingleSeat(rowName, count, availability));
      count++;
    }
    return <>{view}</>;
  };

  // row: 'A', 'B'
  // count : 1, 2, 3
  // availability: 0 / 1
  renderSingleSeat = (rowName, count, availability) => {
    const {seatSelected, ticketDetails} = this.state;
    const seatId = rowName + count; // A1
    return (
      <Seat
        isDisabled={seatSelected.length >= ticketDetails.totalTicket}
        key={seatId}
        available={availability}
        id={seatId}
        onPress={this.selectSeatHandler.bind(this)}
      />
    );
  };

  // * HANDLE SEAT END

  render() {
    const {
      updatedSeatData,
      schedule,
      seatData,
      ticketDetails,
      seatSelected,
      columnLabel,
      rowLabel,
    } = this.state;
    console.log(seatSelected.length < ticketDetails.totalTicket);
    return (
      <>
        <PageHeader
          title={'Select Ticket'}
          onPress={() => this.props.navigation.goBack()}
        />
        <VStack space={4} mx={5} position={'relative'}>
          <Heading size={'md'}>2. Select seats</Heading>
          {/*seat info*/}
          <VStack space={1}>
            <Text>Total tickets: {ticketDetails.totalTicket} </Text>
            <Text>
              {`Adult: ${ticketDetails.adult},  Students: ${ticketDetails.student},  Children: ${ticketDetails.children}`}
            </Text>
            <Text>Seat Selected: {seatSelected.toString()}</Text>
          </VStack>
          {/*seat selection START*/}
          {/* theater screen indicator*/}
          <Box bg={'coolGray.300'} w={'80%'} h={2} alignSelf={'center'} />

          {/* column label*/}
          <HStack
            alignSelf={'center'}
            position={'absolute'}
            top={pxSize(150)}
            space={pxSize(8)}>
            {columnLabel.slice(0, 4).map((v, i) => this.renderLabelText(v, i))}
            <Box w={pxSize(25)} />
            {columnLabel.slice(4, 8).map((v, i) => this.renderLabelText(v, i))}
          </HStack>

          {/* seats */}
          <VStack mt={4} space={pxSize(8)}>
            {this.renderSeats(seatData)}
          </VStack>

          {/* row label*/}
          <VStack
            position={'absolute'}
            space={3}
            left={pxSize(-8)}
            top={pxSize(181)}>
            {rowLabel.map((v, i) => this.renderLabelText(v, i))}
          </VStack>
          {/*seat selection END*/}

          {/*Legend*/}
          <VStack ml={10}>
            <SimpleGrid columns={2} spacingX={5} spacingY={2}>
              {this.renderDummySeat('#9ca3af')}
              <Text fontWeight={700}>Not available</Text>

              {this.renderDummySeat('#34d399')}
              <Text fontWeight={700}>Available</Text>

              {this.renderDummySeat('#fafafa')}
              <Text fontWeight={700}>Selected</Text>
            </SimpleGrid>
          </VStack>
        </VStack>

        {/*Button*/}
        <BottomButton
          title={'Next'}
          onPress={this.toConfirmTicketPage}
          attr={{isDisabled: seatSelected.length < ticketDetails.totalTicket}}
        />
      </>
    );
  }

  renderLabelText = (text, key) => {
    return (
      <Text textAlign={'center'} mx={2} key={key}>
        {text}
      </Text>
    );
  };

  renderDummySeat = color => {
    return (
      <Box
        bgColor={color}
        w={pxSize(24)}
        h={pxSize(24)}
        rounded={pxSize(8)}
        borderWidth={pxSize(3)}
        borderColor={'primary.800'}
      />
    );
  };
}

export default Index;

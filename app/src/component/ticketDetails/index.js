import {StatusBar} from 'expo-status-bar';
import React from 'react';
import {StyleSheet, Text, View, Image, ScrollView, Button} from 'react-native';
import TicketDetails from './TicketDetails';
import TicketPrice from './TicketPrice';
import {BASE_URI} from '../../util/pathMap';
import moment from 'moment';
import {pxSize} from '../../util/pxSize';

function Index({ticketDetails}) {
  const imgSRC = ticketDetails.imgSRC.includes('/images/')
    ? ticketDetails.imgSRC
    : '/images/' + ticketDetails.imgSRC;
  const movieTitle = ticketDetails.movieTitle;
  const info = ticketDetails.info;
  // const info = {
  //   location: ticketDetails.location,
  //   date: ticketDetails.date,
  //   time: '1:30pm',
  //   number: 2,
  //   seat: {
  //     a: 'G3',
  //     b: 'G4',
  //   },
  // };
  console.log(ticketDetails);
  return (
    <ScrollView>
      <View style={styles.container}>
        <Image
          style={styles.image}
          source={{uri: BASE_URI + String(imgSRC)}}
        />
        <Text style={{fontSize: 32, fontWeight: 'bold', margin: 20}}>
          {movieTitle}
        </Text>
        <TicketDetails title={'Location: '} value={info.location} />
        <TicketDetails
          title={'Date: '}
          value={moment(info.date).format('YYYY-MM-DD').toString()}
        />
        <TicketDetails title={'Time: '} value={info.time} />
        <TicketDetails title={'No. of ticket: '} value={String(info.number)} />
        <TicketDetails title={'Seat selected'} value={info.seat} />
        <TicketPrice price={info.price} />
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop: 10,
  },
  image: {
    width: pxSize(270),
    height: pxSize(397),
    borderRadius: 9,
  },
});
export default Index;

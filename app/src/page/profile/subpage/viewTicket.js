import React, {Component} from 'react';
import {Image, Text, View, StyleSheet, TouchableOpacity} from 'react-native';
import ProfileHeader from '../component/Header';
import {Box, ScrollView} from 'native-base';
import moment from 'moment';
import storage from '../../../util/storage';
import {getValidTicket} from '../service';
import {BASE_URI} from '../../../util/pathMap';
import {capitalizeFirstLetter} from '../../../util/util';

class Index extends Component {
  constructor(props) {
    super(props);

    this.state = {
      validTicket: [],
    };
  }

  componentDidMount = async () => {
    const userInfo = await storage.find('userInfo');
    const result = await getValidTicket(userInfo.uid);
    // console.log(result);
    this.setState({
      validTicket: result || [],
    });
  };

  renderLines = () => {
    return (
      <>
        <View
          style={{
            borderBottomColor: 'lightgray',
            borderBottomWidth: 2,
            margin: 15,
          }}
        />
      </>
    );
  };

  renderTicket = ticket => {
    return (
      <View key={ticket._id}>
        <TouchableOpacity
          onPress={() =>
            this.props.navigation.navigate('TicketDetailsPage', {
              ticket: ticket,
            })
          }>
          <View style={styles.container}>
            <Image
              style={styles.image}
              source={{uri: BASE_URI + String(ticket.movieImage)}}
              resizeMethod={'scale'}
            />
            <Text style={styles.text}>{ticket.movieTitle}</Text>
            <Text>
              {moment(ticket.movieDate).format('DD MMM YYYY')} |{' '}
              {ticket.startTime}{' '}
            </Text>
            <Text>
              {ticket.cinemaName} |{' '}
              {Object.entries(ticket.ticket)
                .reduce(
                  (acc, v) => `${capitalizeFirstLetter(v[0])} ${v[1]}, `,
                  '',
                )
                .slice(0, -2)}
            </Text>
          </View>
        </TouchableOpacity>
        {this.renderLines()}
      </View>
    );
  };

  render() {
    const {validTicket} = this.state;
    return (
      <>
        <ProfileHeader
          title={'View Ticket'}
          onPress={() => this.props.navigation.goBack()}
        />
        <ScrollView>
          {validTicket.length ? (
            validTicket.map(v => this.renderTicket(v))
          ) : (
            <Box alignItems={'center'} mt={10}>
              No result found.
            </Box>
          )}
        </ScrollView>
      </>
    );
  }
}

export default Index;

const styles = StyleSheet.create({
  container: {
    padding: 5,
    marginVertical: 20,
    alignItems: 'center',
  },

  text: {
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'center',
    margin: 10,
  },

  image: {
    height: 350,
    width: 300,
    resizeMode: 'contain',
    alignItems: 'center',
    borderRadius: 10,
  },
});

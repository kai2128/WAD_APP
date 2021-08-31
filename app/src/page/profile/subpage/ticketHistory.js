import React, {Component} from 'react';
import {
  Image,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import ProfileHeader from '../component/Header';
import {BASE_URI} from '../../../util/pathMap';
import {ScrollView} from 'native-base';
import {getBookedTicket} from '../service';
import storage from '../../../util/storage';
import moment from 'moment';

class Index extends Component {
  constructor(props) {
    super(props);

    this.state = {
      bookedTicket: [],
    };
  }

  componentDidMount = async () => {
    const userInfo = await storage.find('userInfo');
    const result = await getBookedTicket(userInfo.uid);
    this.setState({
      bookedTicket: result,
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

  renderDetailsBlock = ticket => {
    return (
      <View key={ticket._id}>
        <TouchableOpacity
          onPress={() =>
            this.props.navigation.navigate('TicketDetailsPage', {
              ticket: ticket,
            })
          }>
          <View style={{flexDirection: 'row', alignItems: 'center'}}>
            <View
              style={{
                flex: 2,
                textAlign: 'center',
                marginTop: 15,
              }}>
              <Image
                style={[styles.image]}
                resizeMethod={'scale'}
                source={{uri: BASE_URI + String(ticket.movieImage)}}
              />
            </View>
            <View style={{flexDirection: 'column', flex: 3}}>
              <View style={[styles.container, {flex: 1}]}>
                <Text style={styles.label}>Movie</Text>
                <TextInput
                  style={styles.input}
                  value={ticket.movieTitle}
                  editable={false}
                />
                <Text style={styles.label}>Date</Text>
                <TextInput
                  style={styles.input}
                  value={moment(ticket.movieDate).format('DD-MM-YYYY')}
                  editable={false}
                />
                <Text style={styles.label}>Location</Text>
                <TextInput
                  style={styles.input}
                  value={ticket.cinemaName}
                  editable={false}
                />
                <Text style={styles.label}>Time</Text>
                <TextInput
                  style={[styles.input, {width: 70}]}
                  value={ticket.startTime}
                  editable={false}
                />
              </View>
            </View>
          </View>
        </TouchableOpacity>
        {this.renderLines()}
      </View>
    );
  };

  render() {
    const {bookedTicket} = this.state;
    return (
      <>
        <ProfileHeader
          title={'Ticket History'}
          onPress={() => this.props.navigation.goBack()}
        />
        <ScrollView>
          {bookedTicket.length > 0 ? (
            bookedTicket.map(v => this.renderDetailsBlock(v))
          ) : (
            <Text> No result found. </Text>
          )}
        </ScrollView>
      </>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    marginRight: 15,
  },
  label: {
    fontWeight: 'bold',
    fontSize: 18,
    margin: 5,
    marginBottom: 1,
  },
  input: {
    color: 'black',
    fontSize: 12,
    borderColor: 'gray',
    borderWidth: 1,
    fontWeight: 'bold',
    padding: 0,
    paddingLeft: 10,
    borderRadius: 10,
    backgroundColor: '#e5e5e5',
  },
  image: {
    width: 130,
    height: 200,
    borderRadius: 10,
    margin: 10,
  },
});

export default Index;

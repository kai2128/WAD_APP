import React, {Component} from 'react';
import PageHeader from '../../../component/PageHeader';
import {Box, FormControl, Select, VStack} from 'native-base';
import AppButton from '../../../component/AppButton';
import MyButtonGroup from '../component/MyButtonGroup';
import {
  getAvailDate,
  getAvailLocation,
  getAvailMovie,
  getAvailTime,
  getSchedule,
} from '../service';
import Logout from '../../../component/Logout';

export default class Index extends Component {
  constructor(props) {
    super(props);
    this.state = {
      movie: [],
      selectedMovie: '',
      selectedDate: '',
      selectedLocation: '',
      selectedTime: '',
      date: [],
      location: [],
      locationArr: [],
      time: [],
    };
  }

  toSelectTicketPage = async () => {
    const {selectedMovie, selectedDate, selectedLocation, selectedTime} =
      this.state;
    const schedule = await getSchedule(
      selectedMovie,
      selectedDate,
      selectedLocation,
      selectedTime,
    );
    // console.log(schedule);
    this.props.navigation.navigate('SelectTicketPage', {schedule: schedule});
  };

  setMovieList = async () => {
    this.setState({
      movie: await getAvailMovie(),
    });
  };

  setMovieSelectedFromNavigation = () => {
    const title = this.props.navigation.getParam('title', ''); // get movie from movies details buy ticket
    this.selectMovieHandler(title);
  };

  componentDidMount = async () => {
    await this.setMovieList();
    this.listener = this.props.navigation.addListener('didFocus', () => {
      this.setMovieSelectedFromNavigation();
    });
  };

  componentWillUnmount() {
    this.listener.remove();
  }

  selectMovieHandler = async movie => {
    this.setState({
      date: await getAvailDate(movie),
      selectedMovie: movie,
      time: [],
      selectedDate: '',
      selectedLocation: '',
      selectedTime: '',
    });
  };

  selectDateHandler = async date => {
    this.setState({
      selectedDate: date,
      location: await getAvailLocation(this.state.selectedMovie, date),
      time: [],
      selectedLocation: '',
      selectedTime: '',
    });
  };

  selectedLocation = async location => {
    this.setState({
      selectedLocation: location,
      time: [],
      selectedTime: '',
    });
    this.setState({
      time: await getAvailTime(
        this.state.selectedMovie,
        this.state.selectedDate,
        location,
      ),
    });
  };

  selectTime = index => {
    const {time} = this.state;
    this.setState({selectedTime: time[index]});
  };

  render() {
    const {movie, date, location, time} = this.state;
    return (
      <>
        <PageHeader
          title={'Ticket'}
          onPress={() => Logout(this.props.navigation)}
        />
        <VStack space={10} mx={5}>
          <VStack space={5}>
            <FormControl>
              <FormControl.Label _text={{bold: true}}>Movie</FormControl.Label>
              <Select
                placeholder={'Select movie'}
                onValueChange={itemValue => this.selectMovieHandler(itemValue)}
                selectedValue={this.state.selectedMovie}>
                {movie.map((v, i) => (
                  <Select.Item key={i} label={v.title} value={v.title} />
                ))}
              </Select>
            </FormControl>

            <FormControl
              isDisabled={this.state.selectedMovie == ''}
              _disabled={{backgroundColor: '#d6d3d1'}}>
              <FormControl.Label _text={{bold: true}}>Date</FormControl.Label>
              <Select
                placeholder={'Select date'}
                onValueChange={itemValue => this.selectDateHandler(itemValue)}
                selectedValue={this.state.selectedDate}>
                {date.map((v, i) => (
                  <Select.Item key={i} label={v} value={v} />
                ))}
              </Select>
            </FormControl>

            <FormControl isDisabled={this.state.selectedDate == ''}>
              <FormControl.Label _text={{bold: true}}>
                Location
              </FormControl.Label>
              <Select
                placeholder={'Select location'}
                onValueChange={itemValue => this.selectedLocation(itemValue)}
                selectedValue={this.state.selectedLocation}>
                {location.length > 0 ? (
                  location.map((v, i) => (
                    <Select.Item key={i} label={v.name} value={v.name} />
                  ))
                ) : (
                  <Select.Item key={1} label={'1'} value={'1'} />
                )}
              </Select>
            </FormControl>

            <FormControl>
              <FormControl.Label _text={{bold: true}}>
                Available Time
              </FormControl.Label>
              {time.length > 0 ? (
                <Box minH={200} h={150} w={'100%'} flexWrap={'wrap'}>
                  <MyButtonGroup data={time} updateIndex={this.selectTime} />
                </Box>
              ) : null}
            </FormControl>
          </VStack>

          <AppButton
            title={'Buy Ticket'}
            attr={{isDisabled: this.state.selectedTime == ''}}
            onPress={this.toSelectTicketPage}
          />
        </VStack>
      </>
    );
  }
}


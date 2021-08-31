import React, {Component} from 'react';
import ProfileHeader from '../component/Header';
import {Alert, TouchableOpacity} from 'react-native';
import {
  Box,
  HStack,
  Input,
  KeyboardAvoidingView,
  ScrollView,
  Select,
  Text,
  TextArea,
  VStack,
} from 'native-base';
import {getCinema, operateTime} from '../service';
import AppButton from '../../../component/AppButton';
import DateTimePicker from '@react-native-community/datetimepicker';
import {Icon} from 'react-native-elements';

class Index extends Component {
  constructor(props) {
    super(props);
    this.state = {
      location: [],
      time: operateTime,
      title: '',
      desc: '',
      showPicker: false,
      selectedTime: '',
      selectedLocation: '',
      selectedDate: '',
    };
  }

  async componentDidMount() {
    const cinemaData = await getCinema();
    this.setState({
      location: cinemaData.map(v => v.halfAddress),
    });
  }

  submitHandler = () => {
    this.setState({
      title: '',
      desc: '',
      selectedTime: '',
      selectedLocation: '',
      selectedDate: '',
    });
    Alert.alert('', 'Your response has been recorded.');
  };

  render() {
    const {location, selectedDate, time, title, desc, showPicker} = this.state;
    if (location.length < 0) {
      return <></>;
    }
    return (
      <>
        <ProfileHeader
          title={'Contact Us'}
          onPress={() => this.props.navigation.goBack()}
        />
        <KeyboardAvoidingView flex={1}>
          <ScrollView>
            <VStack mx={3} space={3} my={5}>
              <Box>
                <Text fontWeight={700}>Location</Text>
                <Select
                  placeholder={'Select movie'}
                  onValueChange={itemValue =>
                    this.setState({selectedLocation: itemValue})
                  }
                  selectedValue={this.state.selectedLocation}>
                  {location.map((v, i) => (
                    <Select.Item key={i} label={v} value={v} />
                  ))}
                </Select>
              </Box>

              <HStack justifyContent={'space-between'} space={5}>
                <Box flex={4.5}>
                  <Text fontWeight={700}>Date</Text>
                  {/*Date picker*/}
                  <Input
                    value={selectedDate}
                    editable={false}
                    InputRightElement={
                      <TouchableOpacity
                        onPress={() => this.setState({showPicker: true})}>
                        <Icon name={'calendar-o'} type={'font-awesome'} />
                      </TouchableOpacity>
                    }
                  />
                  {showPicker && (
                    <DateTimePicker
                      value={selectedDate ? new Date(selectedDate) : new Date()}
                      mode={'date'}
                      onChange={(event, date) =>
                        this.setState({
                          selectedDate: date.toLocaleDateString(),
                          showPicker: false,
                        })
                      }
                    />
                  )}
                </Box>
                <Box flex={6.5}>
                  <Text fontWeight={700}>Time of Visit</Text>
                  <Select
                    placeholder={'Select time'}
                    onValueChange={itemValue =>
                      this.setState({selectedTime: itemValue})
                    }
                    selectedValue={this.state.selectedTime}>
                    {time.map((v, i) => (
                      <Select.Item key={i} label={v} value={v} />
                    ))}
                  </Select>
                </Box>
              </HStack>

              <Box>
                <Text fontWeight={700}>Title</Text>
                <Input
                  value={title}
                  onChangeText={text => this.setState({title: text})}
                />
              </Box>

              <Box>
                <Text fontWeight={700}>Description</Text>
                {/*<Input*/}
                {/*  value={desc}*/}
                {/*  multiline={true}*/}
                {/*  h={80}*/}
                {/*  onChangeText={text => this.setState({desc: text})}*/}
                {/*/>*/}
                <TextArea
                  alignContent={'flex-start'}
                  justifyContent={'flex-start'}
                  value={desc}
                  textAlign={'left'}
                  onChangeText={text => this.setState({desc: text})}
                />
              </Box>
            </VStack>
            <AppButton title={'Submit'} onPress={this.submitHandler} />
          </ScrollView>
        </KeyboardAvoidingView>
      </>
    );
  }
}

export default Index;

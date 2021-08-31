import React, {Component} from 'react';
import {ButtonGroup} from 'react-native-elements';

export default class Index extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: this.props.data,
      selectedIndex: -1,
    };
  }

  updateIndex(selectedIndex) {
    this.setState({selectedIndex: selectedIndex});
    this.props.updateIndex(selectedIndex);
  }

  render() {
    const buttons = this.state.data;
    const {selectedIndex} = this.state;

    return (
      <ButtonGroup
        onPress={this.updateIndex.bind(this)}
        selectedIndex={selectedIndex}
        buttons={buttons}
        containerStyle={{
          flex: 1,
          justifyContent: 'flex-start',
          alignContent: 'flex-start',
          backgroundColor: 'transparent',
          flexWrap: 'wrap',
          borderWidth: 0,
        }}
        buttonContainerStyle={{
          maxHeight: 40,
          minWidth: 80,
          maxWidth: 100,
          borderRadius: 20,
          marginHorizontal: 5,
          marginVertical: 5,
          backgroundColor: '#d4d4d4',
          overflow: 'hidden',
        }}
        textStyle={{
          fontSize: 15,
          fontWeight: 'normal',
        }}
        selectedButtonStyle={{
          backgroundColor: '#1f2937',
        }}
        selectedTextStyle={{
          color: '#f5f5f4',
        }}
      />
    );
  }
}

import React, {Component} from 'react';
import Nav from './src/page/nav';
import {Button, NativeBaseProvider, StatusBar} from 'native-base';
import {theme} from './src/style/index';

class App extends Component {
  render() {
    return (
      <NativeBaseProvider theme={theme}>
        <StatusBar backgroundColor={'transparent'} translucent={true} />
        <Nav />
      </NativeBaseProvider>
    );
  }
}

export default App;

import React, {Component} from 'react';
import {Modal, Spinner, Box, NativeBaseProvider, Center} from 'native-base';

let loader;
const defaultTimeOut = -1;

export class loading {
  static show(text = '', timeout = defaultTimeOut, props = {}) {
    loader.setState({isShow: true, text: text, timeout: timeout, props});
  }

  static dismiss() {
    loader.setState({isShow: false});
  }
}

export class Loader extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isShow: false,
      timeout: defaultTimeOut,
      text: '',
    };
    loader = this;
  }

  componentWillUnmount() {
    clearTimeout(this.handle);
  }

  render() {
    clearTimeout(this.handle);
    this.state.timeout !== defaultTimeOut &&
      (this.handle = setTimeout(() => {
        loading.dismiss();
      }, this.state.timeout));

    return (
      <NativeBaseProvider>
        <Modal
          isOpen={this.state.isShow}
          closeOnOverlayClick={false}
          {...this.props}>
          <Box bg="gray.100" px={4} py={3} rounded="md" mb={5}>
            <Spinner color="black" size={50} />
            {this.state.text ? <Center mt={3}>{this.state.text}</Center> : null}
          </Box>
        </Modal>
      </NativeBaseProvider>
    );
  }
}

export default Loader;

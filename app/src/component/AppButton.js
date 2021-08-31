import React, {Component} from 'react';
import {Button} from 'native-base';
import {pxSize} from '../util/pxSize';

class AppButton extends Component {
  render() {
    const {onPress, title, attr} = this.props;
    return (
      <Button
        {...attr}
        alignSelf={'center'}
        onPress={onPress}
        bg={'primary.900'}
        minH={pxSize(50)}
        rounded={50}
        w={pxSize(300)}
        size={'lg'}>
        {title || 'Default'}
      </Button>
    );
  }
}

export default AppButton;

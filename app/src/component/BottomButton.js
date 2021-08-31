import {Box} from 'native-base';
import {pxSize} from '../util/pxSize';
import AppButton from './AppButton';
import React from 'react';

export default function (props) {
  return (
    <Box
      position="absolute"
      bottom={0}
      h={pxSize(80)}
      alignSelf={'center'}
      w={'100%'}>
      <AppButton
        title={props.title}
        attr={props.attr}
        onPress={props.onPress}
      />
    </Box>
  );
}

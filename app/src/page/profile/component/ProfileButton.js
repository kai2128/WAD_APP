import React from 'react';
import {Button, Text} from 'native-base';
import {Icon} from 'react-native-elements';

export default props => {
  return (
    <Button
      onPress={props.onPress}
      w="100%"
      variant="outline"
      rounded="0"
      justifyContent="flex-start"
      borderColor={'gray.400'}
      startIcon={
        props.iconName ? (
          <Icon type={props.iconType || 'font-awesome'} name={props.iconName} />
        ) : null
      }>
      <Text color={props.textColor || 'blueGray.800'} ml={6} fontSize={'lg'}>
        {props.label}
      </Text>
    </Button>
  );
};

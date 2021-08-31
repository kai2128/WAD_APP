import React from 'react';
import {pxSize} from '../util/pxSize';
import {Icon} from 'react-native-elements';
import {Box, Center, HStack, Text} from 'native-base';
import {TouchableOpacity} from 'react-native';

const PageHeader = props => {
  return (
    <Box safeArea w={'100%'} my={3}>
      <HStack w={'100%'} alignItems={'center'} justifyContent={'space-around'}>
        <TouchableOpacity onPress={props.onPress}>
          <Icon
            type={'font-awesome'}
            name={props.iconName || 'angle-left'}
            size={pxSize(30)}
            color={'black'}
          />
        </TouchableOpacity>
        <Center maxW={pxSize(200)}>
          <Text
            fontFamily={'Inter-Bold'}
            fontSize={'3xl'}
            textAlign={'center'}
            color={props.textColor}>
            {props.title}
          </Text>
          {props.bottomText && (
            <Text fontWeight={400} fontSize={'md'} color={'primary.500'}>
              {props.bottomText}
            </Text>
          )}
        </Center>
        <Box />
      </HStack>
    </Box>
  );
};
export default PageHeader;

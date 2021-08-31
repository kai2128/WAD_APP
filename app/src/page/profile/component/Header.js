import React from 'react';
import PageHeader from '../../../component/PageHeader';
import {Box, Image} from 'native-base';
import {pxSize} from '../../../util/pxSize';

export default props => {
  return (
    <>
      <Box
        justifyContent={'center'}
        position={'relative'}
        h={pxSize(186)}
        w={'100%'}
        overflow={'hidden'}>
        {/*/ page header*/}
        <PageHeader
          title={props.title || 'Profile'}
          textColor={'primary.900'}
          onPress={props.onPress}
        />

        {/*/ background*/}
        <Image
          zIndex={-5}
          opacity={0.3}
          pos={'absolute'}
          w={pxSize(377)}
          h={pxSize(186)}
          alt={'Profile Background'}
          source={require('../../../resources/img/profileBackground.jpg')}
        />
      </Box>
    </>
  );
};

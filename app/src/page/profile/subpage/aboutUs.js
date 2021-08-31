import React, {Component, useEffect, useState} from 'react';
import ProfileHeader from '../component/Header';
import {
  Text,
  Box,
  Center,
  Divider,
  HStack,
  Link,
  SimpleGrid,
  VStack,
} from 'native-base';
import {getAboutUs} from '../service';
import {Icon} from 'react-native-elements';
import {pxSize} from '../../../util/pxSize';

const Index = props => {
  const [data, setData] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      const result = await getAboutUs();
      setData(result);
    };
    fetchData();
  }, []);

  const renderData = () => {
    if (data == null) {
      return <></>;
    }

    return (
      <Box flex={1} mx={3}>
        <VStack space={3} pt={4}>
          <Text fontSize={'xl'} fontWeight={700}>
            Our Branches
          </Text>

          <Center h={pxSize(270)}>
            <SimpleGrid columns={2} spacingY={7} spacingX={6}>
              {data.cinema.map((v, i) => (
                <HStack w={40} alignItems={'center'} key={i}>
                  <Icon name={'location-pin'} type={'material-icons'} />
                  <Text fontSize={'sm'}>{v}</Text>
                </HStack>
              ))}
            </SimpleGrid>
          </Center>
          <Divider h={1.5} />
        </VStack>

        <Center mt={5}>
          <VStack
            w={'80%'}
            justifyContent={'center'}
            alignItems={'center'}
            space={3}>
            <HStack space={4} alignSelf={'flex-start'}>
              <Icon name={'mail'} type={'entypo'} />
              <Text fontWeight={700}>{data.aboutUs.email}</Text>
            </HStack>
            <HStack space={4} alignSelf={'flex-start'}>
              <Icon name={'clockcircle'} type={'ant-design'} />
              <Text fontWeight={700}>Operation Hours: </Text>
            </HStack>
            <Text color={'primary.500'}>{data.aboutUs.operation}</Text>
            <HStack space={8} mt={3}>
              <Link href={data.aboutUs.facebook}>
                <Icon
                  size={40}
                  color={'#78716c'}
                  name={'facebook'}
                  type={'material-icons'}
                />
              </Link>
              <Link href={data.aboutUs.instagram}>
                <Icon
                  size={40}
                  color={'#78716c'}
                  name={'instagram'}
                  type={'font-awesome'}
                />
              </Link>
              <Link href={data.aboutUs.twitter}>
                <Icon
                  size={40}
                  color={'#78716c'}
                  name={'twitter'}
                  type={'font-awesome'}
                />
              </Link>
            </HStack>
          </VStack>
        </Center>
      </Box>
    );
  };

  return (
    <>
      <ProfileHeader
        title={'About Us'}
        onPress={() => props.navigation.goBack()}
      />
      {renderData()}
    </>
  );
};

export default Index;

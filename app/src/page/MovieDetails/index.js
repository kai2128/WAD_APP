import React, {Component} from 'react';
import PageHeader from '../../component/PageHeader';
import request from '../../util/request';
import {BASE_URI, MOVIE_DETAILS} from '../../util/pathMap';
import {pxSize} from '../../util/pxSize';
import {ImageBackground} from 'react-native';
import {
  Box,
  Center,
  Heading,
  HStack,
  Image,
  ScrollView,
  SimpleGrid,
  Text,
  VStack,
} from 'native-base';
import AppButton from '../../component/AppButton';
import moment from 'moment';
import {NavigationActions} from 'react-navigation';

class Index extends Component {
  constructor(props) {
    super(props);
    this.state = {
      movie: {},
      isAvailable: false,
    };
  }

  async getMovieDetails() {
    const {
      state: {
        params: {title},
      },
    } = this.props.navigation;
    const query = await request.get(MOVIE_DETAILS + title);
    const result = await query.data.data;
    this.setState({
      movie: result,

      //if status is coming soon, set to unavailable
      isAvailable: result.status != 'coming',
    });
  }

  generateHeaderBottomText() {
    const {movie} = this.state;
    let text = movie.runtime;
    if (movie.rated) {
      return `${movie.rated} | ${text}`;
    }
    return text;
  }

  async componentDidMount() {
    await this.getMovieDetails();
  }

  render() {
    const {movie, isAvailable} = this.state;
    if (!movie || !movie.releaseDate || !movie.castList) {
      return <></>;
    }
    return (
      <>
        <PageHeader
          title={movie.title}
          bottomText={this.generateHeaderBottomText()}
          onPress={() => {
            this.props.navigation.goBack();
          }}
        />
        <ScrollView showsHorizontalScrollIndicator={false}>
          <Center flex={1} my={5} position={'relative'}>
            <Image
              resizeMethod={'scale'}
              alt={movie.title + ' image'}
              source={{uri: BASE_URI + String(movie.localImage)}}
              w={'100%'}
              h={400}
              resizeMode={'contain'}
              borderRadius={pxSize(25)}
            />
            <ImageBackground
              style={{
                width: '100%',
                height: pxSize(325),
                position: 'absolute',
                resizeMode: 'stretch',
                zIndex: -1,
                opacity: 0.8,
              }}
              blurRadius={8}
              source={{uri: BASE_URI + String(movie.localImage)}}
            />
          </Center>
          <VStack space={6} mx={pxSize(20)} mb={pxSize(100)}>
            <Heading color={'primary.900'}>{movie.title}</Heading>
            <Text color={'warmGray.800'} textAlign={'justify'}>
              {movie.description}
            </Text>
            <SimpleGrid columns={2} spacingX={5}>
              <Text w={40} color={'primary.500'}>
                Directed by
              </Text>
              <Text>{movie.director}</Text>
              <Text w={40} color={'primary.500'}>
                Rated
              </Text>
              <Text>{movie.rated}</Text>
              <Text w={40} color={'primary.500'}>
                Running Time
              </Text>
              <Text>{movie.runtime}</Text>
              <Text w={40} color={'primary.500'}>
                Release Date
              </Text>
              <Text>{moment(movie.releaseDate).format('MMMM d, YYYY')}</Text>
            </SimpleGrid>
            <Box>
              <Text fontSize={'lg'} fontWeight={700} mb={2}>
                Cast and Crews
              </Text>
              <ScrollView horizontal showsHorizontalScrollIndicator={true}>
                <HStack space={5}>
                  {movie.castList.map((v, i) => (
                    <Center key={i}>
                      <Text fontWeight={600}>{String(v.name)}</Text>
                      <Text fontWeight={300} color={'primary.400'}>
                        {String(v.as)}
                      </Text>
                    </Center>
                  ))}
                </HStack>
              </ScrollView>
            </Box>
          </VStack>
        </ScrollView>
        <Center
          alignSelf={'center'}
          position={'absolute'}
          bottom={0}
          shadow={5}
          bg={'warmGray.100'}
          w={'100%'}
          h={pxSize(80)}>
          <AppButton
            attr={{
              isDisabled: !isAvailable,
            }}
            title={isAvailable ? 'Buy Ticket' : 'Coming Soon'}
            onPress={() =>
              this.props.navigation.navigate({
                routeName: 'MainTab',
                params: {},
                action: NavigationActions.navigate({
                  routeName: 'SearchTicketPage',
                  params: {title: movie.title},
                }),
              })
            }
            // onPress={() =>
            //   this.props.navigation.navigate(
            //     'MainTab',
            //     {title: movie.title},
            //     NavigationActions.navigate(
            //       {routeName: 'SearchTicketPage'},
            //       {title: movie.title},
            //     ),
            //   )
            // }
          />
        </Center>
      </>
    );
  }
}

export default Index;

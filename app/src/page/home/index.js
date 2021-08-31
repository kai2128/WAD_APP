import React, {Component} from 'react';
import {BASE_URI} from '../../util/pathMap';
import {
  Box,
  Center,
  Heading,
  HStack,
  Image,
  Input,
  ScrollView,
  Text,
  VStack,
} from 'native-base';
import PageHeader from '../../component/PageHeader';
import {pxSize} from '../../util/pxSize';
import {TouchableOpacity} from 'react-native';
import Logout from '../../component/Logout';
import {getMovies, searchMovies} from './service';
import storage from '../../util/storage';

class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: '',
      movies: {},
      searchResult: [],
      search: '',
    };
  }

  componentDidMount = async () => {
    // request movies from server
    this.setState({
      movies: await getMovies(),
      username: await storage.find('userInfo').then(res => res.username),
    });
  };

  searchHandler = text => {
    this.setState({search: text});
    searchMovies(text).then(res => this.setState({searchResult: res}));
  };

  // ** MOVIE START
  renderMovie(movie, index) {
    if (movie) {
      return (
        <TouchableOpacity
          key={index}
          onPress={() =>
            this.props.navigation.navigate('MovieDetailsPage', {
              title: movie.title,
            })
          }>
          <Center rounded="sm" my={5} mr={pxSize(47)}>
            <Image
              resizeMethod={'resize'} // increase performace, reduce ram usage
              alt={movie.title}
              source={{uri: BASE_URI + String(movie.localImage)}}
              h={pxSize(220)}
              w={pxSize(159)}
            />
            <Text my={3} fontWeight={400}>
              {movie.title}
            </Text>
          </Center>
        </TouchableOpacity>
      );
    }
  }

  renderMovieList = (movies, heading) => {
    return (
      <Box>
        <Heading size={'md'}>{heading}</Heading>
        {movies ? (
          <ScrollView showsHorizontalScrollIndicator={false} horizontal>
            <HStack space={3}>
              {movies.map((v, i) => this.renderMovie(v, i))}
            </HStack>
          </ScrollView>
        ) : (
          <Text color={'primary.400'}>Loading...</Text>
        )}
      </Box>
    );
  };

  // render all movies
  renderAllMovieList = movies => {
    return (
      <>
        {this.renderMovieList(movies.openingMovies, 'Opening')}
        {this.renderMovieList(movies.trendingMovies, 'Trending')}
        {this.renderMovieList(movies.comingMovies, 'Coming Soon')}
      </>
    );
  };

  // ** MOVIE END

  renderSearch = searchResult => {
    // prevent render error if symbol is input into search fields
    if (searchResult == null) {
      searchResult = [];
    }
    return (
      <>
        {searchResult.length ? (
          this.renderMovieList(searchResult, 'Search Result')
        ) : (
          <Text color={'primary.500'}>No result found.</Text>
        )}
      </>
    );
  };

  render() {
    const {movies, search, searchResult, username} = this.state;
    return (
      <>
        <PageHeader
          title={'Home'}
          onPress={() => Logout(this.props.navigation)}
        />
        <VStack space={5} mx={5} flex={1}>
          <VStack space={1}>
            <Text>Welcome,</Text>
            <Heading size={'md'}>{username}</Heading>
          </VStack>
          <Input
            bg={'primary.200'}
            variant={'rounded'}
            placeholder={'Search'}
            value={search}
            onChangeText={this.searchHandler}
          />
          <ScrollView showsVerticalScrollIndicator={false}>
            {search
              ? this.renderSearch(searchResult)
              : this.renderAllMovieList(movies)}
          </ScrollView>
        </VStack>
      </>
    );
  }
}

export default Home;

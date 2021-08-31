import {getData} from '../../util/request';
import {MOVIE_LIST, SEARCH_MOVIE} from '../../util/pathMap';

export const getMovies = async () => {
  return await getData(MOVIE_LIST);
};

export const searchMovies = async title => {
  return await getData(SEARCH_MOVIE, title);
};

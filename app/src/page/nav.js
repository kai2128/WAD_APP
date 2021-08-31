import {createAppContainer} from 'react-navigation';
import {createStackNavigator} from 'react-navigation-stack';

// pages
import WelcomeStack from './login';
import MainTab from './mainTab';
import MovieDetailsPage from './MovieDetails';

const AppStack = createStackNavigator(
  {
    // subpage
    WelcomeStack: {
      screen: WelcomeStack,
    },
    MainTab: {
      screen: MainTab,
    },
    MovieDetailsPage: {
      screen: MovieDetailsPage,
    },
  },
  {
    initialRouteName: 'WelcomeStack',
    mode: 'modal',
    headerMode: 'none',
  },
);

export default createAppContainer(AppStack);

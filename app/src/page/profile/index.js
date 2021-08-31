import {createStackNavigator} from 'react-navigation-stack';

// pages
import ProfileMenuPage from './subpage/profileMenu';
import AboutUsPage from './subpage/aboutUs';
import ContactUsPage from './subpage/contactUs';
import ProfileSettingPage from './subpage/profileSettings';
import TicketDetailsPage from './subpage/ticketDetails';
import TicketHistoryPage from './subpage/ticketHistory';
import ViewTicketPage from './subpage/viewTicket';


const ProfileStack = createStackNavigator(
  {
    ProfileMenuPage: {
      screen: ProfileMenuPage,
    },
    AboutUsPage: {
      screen: AboutUsPage,
    },
    ContactUsPage: {
      screen: ContactUsPage,
    },
    ProfileSettingPage: {
      screen: ProfileSettingPage,
    },
    TicketDetailsPage: {
      screen: TicketDetailsPage,
    },
    TicketHistoryPage: {
      screen: TicketHistoryPage,
    },
    ViewTicketPage: {
      screen: ViewTicketPage,
    },
  },
  {
    mode: 'modal',
    headerMode: 'none',
    initialRouteName: 'ProfileMenuPage',
  },
);

export default ProfileStack;

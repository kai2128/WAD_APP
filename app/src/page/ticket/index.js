import {createAppContainer} from 'react-navigation';
import {createStackNavigator} from 'react-navigation-stack';

// pages
import SearchTicketPage from './subpage/searchTicket';
import SelectTicketPage from './subpage/selectTicket';
import SelectSeatPage from './subpage/selectSeat';
import TicketConfirmPage from './subpage/ticketConfirm';
import TicketPaymentPage from './subpage/ticketPayment';

const TicketStack = createStackNavigator(
  {
    // rootpage
    // RootPage: {
    //   screen: searchTicket,
    //   navigationOptions: {
    //     headerShown: false,
    //   },
    // },
    // subpage
    SearchTicketPage: {
      screen: SearchTicketPage,
    },
    SelectTicketPage: {
      screen: SelectTicketPage,
    },
    SelectSeatPage: {
      screen: SelectSeatPage,
    },
    TicketConfirmPage: {
      screen: TicketConfirmPage,
    },
    TicketPaymentPage: {
      screen: TicketPaymentPage,
    },
  },
  {
    mode: 'modal',
    headerMode: 'none',
    initialRouteName: 'SearchTicketPage',
  },
);

// TicketStack.navigationOptions = ({navigation}) => {
//   let tabBarVisible = true;
//
//   let routeName = navigation.state.routes[navigation.state.index].routeName;
//
//   if (routeName == 'SearchTicketPage') {
//     tabBarVisible = false;
//   }
//
//   return {
//     tabBarVisible,
//   };
// };

export default TicketStack;

import React, {Component} from 'react';
import ProfileHeader from '../component/Header';
import TicketDetails from '../../../component/ticketDetails';

class Index extends Component {
  constructor(props) {
    super(props);
    const ticket = this.props.navigation.getParam('ticket');
    this.state = {
      ticketDetails: {
        movieTitle: ticket.movieTitle,
        imgSRC: ticket.movieImage,
        info: {
          price: ticket.price,
          location: ticket.cinemaName,
          date: ticket.movieDate,
          time: ticket.startTime,
          number: ticket.seatSelected.length,
          seat: ticket.seatSelected.toString(),
        },
      },
    };
  }

  render() {
    return (
      <>
        <ProfileHeader
          title={'View Ticket'}
          onPress={() => this.props.navigation.goBack()}
        />
        <TicketDetails ticketDetails={this.state.ticketDetails} />
      </>
    );
  }
}

export default Index;

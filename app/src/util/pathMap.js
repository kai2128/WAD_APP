export const BASE_URI = 'http://10.0.2.2:3000';

// * USER *
export const USER_LOGIN = '/user/login';

export const USER_REGISTER = '/user/register';

export const EMAIL_CHECK = '/user/checkEmail';

// #PUT
// uid, oldPassword, newPassword
export const CHANGE_PASS = '/user/password';

// #GET
// uid
export const BOOKED_TICKET = '/user/bookedTickets/';

// #GET
// uid
export const VIEW_NEW_TICKET = '/user/viewNewTickets/';

// * Cinema details * #get

export const ABOUT_US = '/cinema/about';

export const ALL_CINEMA = '/cinema';

// * Movie *

export const MOVIE_LIST = '/movie';

export const SEARCH_MOVIE = '/movie/search/'; // :title

export const MOVIE_DETAILS = '/movie/details/'; // :movieTitle

// * Ticket *

export const AVAIL_MOVIE = '/movie/available';

// return only 1 ticket for user to select seat in app
export const AVAIL_TICKET = '/ticket/search/'; // :movieTitle / : movieTitle , : Date /  : movieTitle , : Date , : location

// #POST after payment is complete
export const NEW_TICKET = '/ticket/newTicket'; // movieTitle, userId, scheduleId, bankCard, ticketSelected{}, totalPrice, seatSelected[seatId], seat[]

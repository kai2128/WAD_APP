import request, {getData} from '../../util/request';
import {AVAIL_MOVIE, AVAIL_TICKET, NEW_TICKET} from '../../util/pathMap';
import storage from '../../util/storage';

export const getAvailMovie = async () => {
  return getData(AVAIL_MOVIE);
};
export const getAvailDate = async movie => {
  return getData(AVAIL_TICKET, movie);
};
export const getAvailLocation = async (movie, date) => {
  return getData(AVAIL_TICKET, movie, date);
};
export const getAvailTime = async (movie, date, location) => {
  return getData(AVAIL_TICKET, movie, date, location);
};
export const getSchedule = async (movie, date, location, startTime) => {
  return getData(AVAIL_TICKET, movie, date, location, startTime);
};

export const createTicket = async (schedule, newTicket) => {
  const result = await request.post(NEW_TICKET, {
    movieTitle: schedule.movieTitle,
    localImage: schedule.localImage,
    userId: newTicket.userId,
    scheduleId: schedule._id,
    bankCard: newTicket.bankCard,
    ticketSelected: newTicket.ticketSelected,
    totalPrice: newTicket.totalPrice,
    price: newTicket.price,
    seatSelected: newTicket.seatSelected,
    seat: newTicket.seat,
  });
  return result.data;
};

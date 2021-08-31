import request, {getData} from '../../util/request';
import {
  ABOUT_US,
  ALL_CINEMA,
  BOOKED_TICKET,
  CHANGE_PASS, VIEW_NEW_TICKET,
} from "../../util/pathMap";
import storage from '../../util/storage';

// get all cinema details
export const getCinema = async () => {
  return getData(ALL_CINEMA);
};

// get about us
export const getAboutUs = () => {
  return getData(ABOUT_US);
};

// get all booked data
export const getBookedTicket = async () => {
  const userInfo = await storage.find('userInfo');
  return getData(BOOKED_TICKET, userInfo.uid);
};

export const getValidTicket = async () => {
  const userInfo = await storage.find('userInfo');
  return getData(VIEW_NEW_TICKET, userInfo.uid);
};


//change password
export const changePassword = async (oldPass, newPass) => {
  const userInfo = await storage.find('userInfo');
  const result = await request.put(CHANGE_PASS, {
    uid: userInfo.uid,
    oldPassword: oldPass,
    newPassword: newPass,
  });
  return result.data;
};



export const operateTime = [
  '10.00 am',
  '11.00 am',
  '12.00 pm',
  '1.00 pm',
  '2.00 pm',
  '3.00 pm',
  '4.00 pm',
  '5.00 pm',
  '6.00 pm',
  '7.00 pm',
  '8.00 pm',
  '9.00 pm',
  '10.00 pm',
  '11.00 pm',
  '12.00 pm',
];

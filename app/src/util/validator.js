export default {
  validateEmail(email) {
    const reg = /\w[-\w.+]*@([A-Za-z0-9][-A-Za-z0-9]+\.)+[A-Za-z]{2,14}/;
    return reg.test(email);
  },

  validatePassword(password) {
    const reg = /^[A-Za-z0-9_]{5,20}$/;
    return reg.test(password);
  },

  validateUsername(username) {
    const reg = /^[A-Za-z0-9]{5,10}$/;
    return reg.test(username);
  },
};

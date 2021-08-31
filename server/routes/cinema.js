var express = require("express");
var cinemaRouter = express.Router();
const Cinema = require('../models/cinema'),
    About = require('../models/about');
const {response} = require("../util/" +
    "util");

cinemaRouter.get('/', async (req, res) => {
    const allCinema = await Cinema.find();
    response(res, 200, 'Cinema details', allCinema)
})

cinemaRouter.get('/about', async (req, res) => {
    // await About.create({
    //     email: 'admin@keejy.com.my',
    //     operation: 'Monday-Sunday 10am - 12am',
    //     facebook: 'https://www.facebook.com/KeejyWorksCinema',
    //     twitter: 'https://www.twitter.com/KeejyWorksCinema',
    //     instagram: 'https://www.instagram.com/KeejyWorksCinema',
    // })
    const aboutUs = await About.find();
    let allCinema = await Cinema.find();
    allCinema = allCinema.map(v => v.fullAddress);
    response(res, 200, 'About Us', {aboutUs: aboutUs[0], cinema: allCinema})
})


module.exports = cinemaRouter;


// await About.create({
//     email: "admin@keejy.com.my",
//     operation: "Monday-Sunday 10am-12am",
//     facebook: '',
//     instagram: '',
//     twitter: '',
// })

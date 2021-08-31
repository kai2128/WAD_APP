
var express = require("express");
var ticketRouter = express.Router();
const moment = require('moment');

// models
const Movie = require('../models/movie'),
    MovieSchedule = require('../models/movieSchedule'),
    User = require('../models/user'),
    Ticket = require('../models/ticket'),
    Cinema = require('../models/cinema');

const {response, getNextDate} = require("../util/util");

/**
 * Buy New Ticket
 */

// 1 search ticket with movie, return available date r: "2021-07-11"
ticketRouter.get('/search/:movieTitle', async (req, res) => {
    const {movieTitle} = req.params;
    const query = await MovieSchedule.find({movieTitle: movieTitle}, {date: 1, _id: 0});
    let result = [...new Set(query.map(v => moment(v.date).format("YYYY-MM-DD")))];
    result = result.filter(v =>
        moment(v).isAfter(moment().subtract(1,'day'))
    )
    response(res, 200, 'Available date', result);
})

// 2 filter available location
ticketRouter.get('/search/:movieTitle/:date', async (req, res) => {
    const {movieTitle, date} = req.params;
    const [lower, upper] = getNextDate(date);

    // search available location
    const query = await MovieSchedule.find({movieTitle: movieTitle, date: {$gte: lower, $lt: upper}}, {cinemaName: 1, _id: 0}).lean();
    let result = [...new Set(query.map(v => v.cinemaName))];

    // get location from cinema names
    const location = await Cinema.find({name: {$in: result}}, {name: 1,location: 1, _id: 0}).lean();
    response(res, 200, 'Available location', location);
})

// 3 filter available time
ticketRouter.get('/search/:movieTitle/:date/:cinemaName', async (req, res) => {
    const {movieTitle, date, cinemaName} = req.params;
    const [lower, upper] = getNextDate(date);

    let query = await MovieSchedule.find({movieTitle: movieTitle, date: {$gte: lower, $lt: upper}, cinemaName: cinemaName}, {startTime:1}).sort({'startTime': 1}).exec();
    query = query.map(value => value.startTime);
    response(res, 200, 'Available time', query);
})

// get movie schedule
ticketRouter.get('/search/:movieTitle/:date/:cinemaName/:startTime', async (req, res) => {
    const {movieTitle, date, cinemaName, startTime} = req.params;
    const [lower, upper] = getNextDate(date);

    let query = await MovieSchedule.findOne({movieTitle: movieTitle, date: {$gte: lower, $lt: upper}, cinemaName: cinemaName, startTime: startTime});
    // query = query.sort()
    response(res, 200, 'Selected schedule', query);
})

/*
2 Next, select seat
 */
ticketRouter.post('/newTicket', async (req, res) => {
    console.log(req.body)
    try {
        const {scheduleId, seatSelected, price, bankCard, userId, seat, movieTitle, totalPrice, ticketSelected} = req.body;

        const movieScheduleToBeUpdate = await MovieSchedule.findById(scheduleId);
        movieScheduleToBeUpdate.seat = seat;
        console.log(movieScheduleToBeUpdate.seat);
        movieScheduleToBeUpdate.save();

        const movieSelected = await Movie.findOne({title: movieTitle});

        const newTicket = await Ticket.create({
            movie: movieSelected.id,
            movieSchedule: movieScheduleToBeUpdate.id,
            user: userId,
            movieTitle: movieTitle,
            movieImage: movieSelected.localImage,
            movieDate: movieScheduleToBeUpdate.date,
            startTime: movieScheduleToBeUpdate.startTime,
            cinemaName: movieScheduleToBeUpdate.cinemaName,
            theater: movieScheduleToBeUpdate.theatre,
            seatSelected: seatSelected,
            ticket: ticketSelected,
            totalPrice: totalPrice, // after sst
            price: price, //before sst
            bankCard: bankCard,
        })
        response(res, 200, 'Booked success', newTicket);
    }catch (err) {
        response(res, 500, 'Failed, please try again', err);
    }
})

module.exports = ticketRouter;

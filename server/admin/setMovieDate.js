const mongoose = require('../core/mongodb').connect();

// Models
const Movie = require('../models/movie'),
    Cinema = require('../models/cinema'),
    MovieSchedule = require('../models/movieSchedule');

const moment = require('moment');

// * original date 11/7
// v1: date updated to 22/7, add 11 days to release date
//

// set this >
const dateToBeAdded = 11;

(async() => {
    const  movies = await Movie.find({});
    movies.forEach((v) => {
        v.releaseDate = moment(v.releaseDate).add(dateToBeAdded,'days').toDate();
        v.save();
    });
    console.log(movies);
})();


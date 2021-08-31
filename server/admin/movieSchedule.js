const mongoose = require('../core/mongodb').connect();

// Models
const Movie = require('../models/movie'),
    Cinema = require('../models/cinema'),
    MovieSchedule = require('../models/movieSchedule');


// operation hours 7 days per week 10am - 12am, 10 hours per day
// each movie 3 hours , 1 day, 1 theatre 3 movies per day
// 1 mall 5 theatre
// 7 cinemas,
// 7
const {format} = require('date-format-parse');
const createMovieSchedule = require('./createMovieSchedule');

const {hoursPerDay} = require('./constants');

/**
 * Run this to generate tickets
 */
(async () => {
    const howManyDays = 3;             // < change this to make tickets for ? day, ex: 3, make tickets for 3 day after
    const currentDate = new Date();

    // * Movie search condition
    // get all opening movie with status not equal to coming
    const openingMovies = await Movie.find({
       status: {$ne: 'coming'}
    }).lean();
    // console.log(openingMovies);

    // get all cinemas
    const cinemas = await Cinema.find({})


    // create new schedule
    for (let i = 0; i < howManyDays; i++) {
        let scheduleDate = new Date();
        scheduleDate.setDate(currentDate.getDate() + i);

        for (let cinema of cinemas) {
            // 5
            for (let theater of cinema.theatre) {
                // 4
                // total 20
                let addedMovies = [];
                for (let hours of hoursPerDay) {

                    let randElement = -1;
                    let count = 0;
                    while (true) {
                        randElement = Math.floor((Math.random() * openingMovies.length))
                        if (randElement in addedMovies) {
                            // add count if element is selected before
                            count++;

                            //if continues got same element getting selected means total movies to less, need repeat
                            if (count > 40) {
                                addedMovies.push(randElement);
                                break
                            }

                            // loop again if number is selected
                            continue
                        }

                        addedMovies.push(randElement);
                        break
                    }
                    let movieSelected = openingMovies[randElement];
                    const result = await createMovieSchedule(cinema.name, theater, movieSelected.title, movieSelected.localImage, scheduleDate, hours.startTime, hours.endTime);
                }
            }
        }
    }

    await process.exit();
})()

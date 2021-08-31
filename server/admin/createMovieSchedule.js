const MovieSchedule = require('../models/movieSchedule');

module.exports = async (cinemaName, theatre, movieTitle, localImage, date, startTime, endTime) => {
    try {
        const res = await MovieSchedule.create({
            cinemaName: cinemaName,
            theatre: theatre,
            movieTitle: movieTitle,
            localImage: localImage,
            date: date,
            startTime: startTime,
            endTime: endTime
        })
        console.log(res.summary + " created");

    } catch (e) {
        console.log(movieTitle + ' Failed to insert. ' + e);
    }
}

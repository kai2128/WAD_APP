const {mongoose} = require('../core/mongodb.js');

const Schema = mongoose.Schema

const movieScheduleSchema = new Schema({

    // mall name
    cinemaName: String,
    // A B C D
    theatre: String,
    movieTitle: String,
    localImage: String,
    date: Date,
    startTime: String,
    endTime: String,

    // on air, close, open
    status: {
        type: String,
        default: 'open'
    },
    // 1 - available, 0 - unavailable
    seat: {
        type: Object,
        default: {
            A: [1,1,1,1,1,1],
            B: [1,1,1,1,1,1,1,1],
            C: [1,1,1,1,1,1,1,1],
            D: [1,1,1,1,1,1,1,1],
            E: [1,1,1,1,1,1,1,1],
            F: [1,1,1,1,1,1,1,1],
            G: [1,1,1,1,1,1,1,1],
            H: [1,1,1,1,1,1],
        }
    }
    }
)

movieScheduleSchema.virtual('summary').get(function (){
    return `${this.movieTitle}  ${this.date} ${this.cinemaName} ${this.startTime}-${this.endTime}`
})

// movieScheduleSchema.methods.selectSeat = function (ids) {
//     for (let id of ids) {
//         let row = id[0];
//         let column = id[1]
//         this.seat[row][column]--;
//     }
//     return this.seat;
// }

module.exports = mongoose.model('Movie_Schedule', movieScheduleSchema)



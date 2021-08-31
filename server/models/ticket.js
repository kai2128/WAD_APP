const {mongoose} = require('../core/mongodb.js');

const Schema = mongoose.Schema

// use to record use booking
const ticketSchema = new Schema({
        movie: {
            type: mongoose.SchemaTypes.ObjectId,
            ref: 'Movie',
        },
        movieSchedule: {
            type: mongoose.SchemaTypes.ObjectId,
            ref: 'Movie_Schedule',
        },
        user: {
            type: mongoose.SchemaTypes.ObjectId,
            ref: 'User',
        },
        movieTitle: String,
        movieImage: String,
        movieDate: Date,
        startTime: String,
        cinemaName: String,

        // A, B
        theater: String,

        // A1, A2
        seatSelected: Array,

        // Child, RM 13
        ticket: Object,

        totalPrice: {
            type: String
        },

        price: String,

        // Bank card XXXX-XXXX-XXXX-1234
        bankCard: {
            type: String,
            set: v => ("XXXX-XXXX-XXXX-" + v.substr(v.length-4,v.length-1))
        }
    }, {timestamps: true}
)


module.exports = mongoose.model('Ticket', ticketSchema)


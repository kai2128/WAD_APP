const {mongoose} = require('../core/mongodb.js');

const Schema = mongoose.Schema

const cinemaSchema = new Schema({
        // Mall name
        name: {
            type: String,
            index: true,
            unique: true,
        },

        city: String,

        address: String,

        // longitude, latitude
        location: [Number, Number],

        theatre: {
            type: Array,
            default: ["A", "B", "C", "D", "E"],
        }
    }, {
        toJSON: {virtuals: true},
        toObject: {virtuals: true}
    }
)

// Imago Mall, Kota Kinabalu, Sabah
cinemaSchema.virtual('fullAddress').get(function () {
    return `${this.name}, ${this.address}`
})

cinemaSchema.virtual('halfAddress').get(function () {
    return `${this.name}, ${this.city}`
})


module.exports = mongoose.model('Cinema', cinemaSchema)



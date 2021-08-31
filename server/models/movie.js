const { mongoose } = require('../core/mongodb.js');



const Schema = mongoose.Schema

const movieSchema = new Schema({
    title: {
        type: String,
        index: true,
        unique: true,
    },
    description: String,
    director: String,
    rated: String,
    runtime: String,
    releaseDate: Date,
    image: {
        type: String,
    },
    localImage: {
        type: String,
        get: v => `/images/${v}`
    },
    castList: [{
        name: [String],
        as: [String]
    }],
    categories: [String],
    status: String,
}, {
    toObject: {getters: true},
    toJSON: {getters: true},
})

module.exports = mongoose.model('Movie', movieSchema)



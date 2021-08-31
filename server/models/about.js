const {mongoose} = require('../core/mongodb.js');

const Schema = mongoose.Schema

const aboutSchema = new Schema({
    name: {
        type: String,
        default: "KWC",
    },
    email: String,
    operation: String,
    facebook: String,
    instagram: String,
    twitter: String,
})

module.exports = mongoose.model('about', aboutSchema)

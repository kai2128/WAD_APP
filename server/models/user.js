const { mongoose } = require('../core/mongodb.js');
const userScheme = new mongoose.Schema({
    username: {type: String, required: true},

    email: {
        type: String,
        required: true,
        index: true,
        unique: [true, 'Email already exists'],
    },

    password: {
        type: String,
        required: true,
    }
}, {
    toJSON: {virtuals: true},
})

userScheme.virtual('tickets',{
    ref: 'Ticket',
    localField: '_id',
    foreignField: 'user',
    justOne: false,
})


module.exports = mongoose.model('User', userScheme)



const mongoose = require('mongoose')
const CONFIG = require('../app.config')
exports.mongoose = mongoose

// mongoose.Promise = global.Promise

// connect to database
exports.connect = () => {

    // connect to mongodb
    mongoose.connect(CONFIG.MONGODB.uri, {
        useCreateIndex: true,
        useNewUrlParser: true,
        useUnifiedTopology: true,
        promiseLibrary: global.Promise
    })

    mongoose.connection.on('error', error => {
        console.error('Connection to database failed')
    })

    mongoose.connection.once('open', () => {
        console.log('Connected to database')
    })


    return mongoose
}


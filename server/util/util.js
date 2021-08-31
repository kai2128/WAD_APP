const CONFIG = require('../app.config').SERVER
const User = require('../models/user')
const jwt = require('jsonwebtoken')


module.exports = {
    response(res, httpCode = 500,  msg = '', data ={}) {
        let resData = {};
        resData.status = httpCode;
        resData.msg = msg;
        resData.data = data;
        res.send(resData);
    },

    async auth(req, res, next){
        const rawAuth = String(req.headers.authorization).split(' ').pop();
        // decrypt token
        const {id} = jwt.verify(rawAuth, CONFIG.SERVER.jwtkey)
        req.user = await User.findById(id)
        if(!req.user){
            res.status(400).send("Not authorized")
            return
        }
        next()
    },

    getNextDate(date, days = 1){
        const currentDate = new Date(date);
        const nextDate = new Date(date);
        nextDate.setDate(currentDate.getDate()+days);
        return [currentDate, nextDate];
    }
}

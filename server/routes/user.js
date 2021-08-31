var express = require("express");
var userRouter = express.Router();
const User = require('../models/user')
const CONFIG = require('../app.config')
const jwt = require('jsonwebtoken')
const {response} = require("../util/util");

const auth = require('../util/util').auth
const moment = require('moment')

userRouter.get("/", async function (req, res) {
    const users = await User.find();
    res.send(users);
});

userRouter.post("/login", (req, res) => {
    let {email, password} = req.body;
    User.findOne({
            email,
            password
        }
    )
        .then(userInfo => {
            if (userInfo) {
                response(res, 200, 'Login Success', {
                ...userInfo._doc,
                    token: generateToken(userInfo._id),
                })
            }else
                response(res, 500, 'Incorrect username or password')
        })
        .catch((err) => {
            response(res, 500, 'Incorrect username or password')
        })
})

// used to generate token expires in 1 week
function generateToken(_id) {
    return jwt.sign({
        id: String(_id),
    }, CONFIG.SERVER.jwtkey, {expiresIn: 60 * 60 * 24 * 7})
}

userRouter.post('/register', async (req, res) => {
    let { password, email, username} = req.body;

    try{
        // save to database
        const newUser = await User.create({
            password: password,
            email: email,
            username: username
        })
        response(res, 200, 'success', newUser);
    }catch (err){
        response(res, 500, 'Email already exist')
    }

})

userRouter.get('/checkEmail/:email', async (req, res) => {
    const {email} = req.params
    const exist = await User.find({email: email})
    if(exist.length>0)
        response(res, 10000, 'Email already exist')
    else
        response(res, 200)
})

// change password
userRouter.put('/password', async (req,res) => {
    const {uid, oldPassword, newPassword} = req.body;
    const user = await User.findById(uid);
    if(user.password == oldPassword){
        user.password = newPassword
        user.save();
        response(res, 200, "Password changed.", user)
    }else
        response(res, 500, "Failed to update password")
})

// check user history booking
userRouter.get('/bookedTickets/:uid', async (req, res) => {
    const {uid} = req.params
    const bookedTickets = await User.findById(uid).populate('tickets')
    // sort using date desc
    bookedTickets.tickets.sort((a,b) => {
        return new Date(b.movieDate) - new Date(a.movieDate)
    })

    if(bookedTickets)
        response(res, 200, 'Booked Tickets', bookedTickets.tickets)
    else
        response(res, 500, 'No records found')
})

// check newly booked ticket, tickets havent expired
userRouter.get('/viewNewTickets/:uid', async (req, res) => {
    const {uid} = req.params
    const bookedTickets = await User.findById(uid).populate('tickets')
    const result = bookedTickets.tickets.filter(v=> new Date(v.movieDate)>=moment().subtract(1, 'day').toDate())
    // sort using date asd
    result.sort((a,b) => {
        return new Date(a.movieDate) - new Date(b.movieDate)
    })

    if(result.length>0)
        response(res, 200, 'Booked Tickets', result)
    else
        response(res, 500, 'No records found')
})


userRouter.delete('/:uid', async (req, res) => {
    const {uid} = req.params

    const result = await User.remove({_id: uid})
    if (result) {
        console.log(result)
        res.status(200).json({
            message: 'deleted'
        })
    } else {
        res.status(500).send("Failed to delete")
    }

})

// use to test token
userRouter.get("/details", auth, async (req, res) => {
    res.send(req.user)
})

// userRouter.put("/:uid", function (req, res, next) {
//     res.status(201).send(req.uid + " updated");
// });

module.exports = userRouter;

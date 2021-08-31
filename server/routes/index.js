/*
 * all routers
 */
const home = require("./home"),
    user = require("./user"),
    movie = require("./movie"),
    ticket = require("./ticket"),
    cinema = require("./cinema");

module.exports = (app) => {
    app.use("/", home);
    app.use("/user", user);
    app.use("/movie", movie);
    app.use("/ticket", ticket);
    app.use("/cinema", cinema);
};

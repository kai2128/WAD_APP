var express = require("express");
var movieRouter = express.Router();
const Movie = require('../models/movie')
const MovieSchedule = require('../models/movie')
const {response} = require("../util/util");


// home page
movieRouter.get("/", async (req,res) => {
    const openingMovies = await Movie.find({status: 'opening'}, {localImage: 1, title: 1, status:1, releaseDate:1});
    const trendingMovies = await Movie.find({status: 'trending'}, {localImage: 1, title: 1, status:1, releaseDate:1});
    const comingMovies = await Movie.find({status: 'coming'}, {localImage: 1, title: 1, status:1, releaseDate:1});
    response(res, 200, "Movie List", {openingMovies, trendingMovies, comingMovies});
})

movieRouter.get("/available", async (req,res) => {
    const availableMovie = await Movie.find({$or:[{status: 'opening'}, {status: 'trending'}]}, {title: 1, status:1, releaseDate:1});
    response(res, 200, "Movie List", availableMovie);
})

// movie details page
movieRouter.get("/details/:title", async (req,res) => {
    const query = await Movie.findOne({title: req.params.title}, {image: 0, categories: 0 })
    if(query)
        response(res,200,"Movie Details", query);
    else
        response(res, 500, 'No data')
})

// search movie using title
movieRouter.get("/search/:title", async (req,res) => {
    const regex= new RegExp(req.params.title);
    const query = await Movie.find({title: {$regex:regex}}, {localImage: 1, title: 1})
    if(query.length>0)
        response(res,200,"Movie search result", query);
    else
        response(res, 500, 'No result')
})


module.exports = movieRouter;

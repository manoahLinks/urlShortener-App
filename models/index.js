// requiring mongoose 
let mongoose = require('mongoose'),
    passportLocalMongoose = require('passport-local-mongoose')

// setting the mongoose debugging mode used in the terminal
mongoose.set('debug', true)

// creating and connecting to a database
mongoose.connect('mongodb://localhost/urlShortener')

// alerting mongoose to allow us chain promises
mongoose.Promise = Promise

// requiring and exporting the admin & link models
module.exports.Admin = require('./admin')
module.exports.Links = require('./links')
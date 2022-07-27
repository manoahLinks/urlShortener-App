// requiring dependencies needed
let mongoose = require('mongoose'),
    passportLocalMongoose = require('passport-local-mongoose')

// defining the admin schema
adminSchema = new mongoose.Schema({
    email:      {type: String, required: [true, 'email field cannot be empty']},
    // firstName:  {type: String},
    // lastName:   {type: String},
    password:   {type: String, required: [true, 'password field cannot be empty']}
    // group:      {type: Number, default: 1},
    // ipAddress:  {type: String},
    // browser:    {type: String},
    // createdAt:  {type: Date, default: Date.now()},
    // updatedAt:  {type: String, default: Date.now()}
})


// adding more methods and functionalities to the admin schema
adminSchema.plugin(passportLocalMongoose)

// creating a model out of the admin schema
let Admin = mongoose.model('Admin', adminSchema)

// exporting the admin model
module.exports = Admin


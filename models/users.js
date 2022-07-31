// requiring dependencies needed
let mongoose = require('mongoose')

// defining the users schema
userSchema = new mongoose.Schema({
    email:      {type: String, unique: true, required: [true, 'email field cannot be empty']},
    firstName:  {type: String},
    lastName:   {type: String},
    password:   {type: String, required: [true, 'password field cannot be empty']},
    group:      {type: Number, default: 1},
    status:     {type: Number, default: 1},
    links:      [{type: mongoose.Schema.Types.ObjectId, ref: 'Links'}],
    ipAddress:  {type: String},
    browser:    {type: String},
    createdAt:  {type: Date, default: Date.now()},
    updatedAt:  {type: String, default: Date.now()}
})


// creating a model out of the User schema
let User = mongoose.model('User', userSchema)

// exporting the admin model
module.exports = User


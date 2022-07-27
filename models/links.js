// requiring the dependencies needed
let mongoose = require('mongoose')

// defining the link schema
linkSchema = new mongoose.Schema({
    AdminId:    [{ type: mongoose.Schema.Types.ObjectId, ref: "Admin"}] ,
    longUrl:    {type: String, required: [true]},
    shortUrl:   {type: String, required: [true]},
    title:      {type: String},
    clicks:     {type:Number, default: 0},
    createdAt:  {type: Date, default: Date.now()},
    updatedAt:  {type: Date, default: Date.now()}
})

//  creating a model of the linkschema
let Links = mongoose.model('Links', linkSchema)

// exporting the links model
module.exports = Links
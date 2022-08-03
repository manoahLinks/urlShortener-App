// requirind dependencies needed
let db = require('../models'),
    jwt = require('jsonwebtoken'),
    bcrypt = require('bcrypt'),
    User = require('../models/users')
    

exports.registerUser = async (req, res) =>{
    
    body = req.body

    if(!body.email && body.password){
        res.status(401).json({message: 'All fields are required'})
    }

    const user = new User(body)

    const salt = await bcrypt.genSalt(10)

    user.password = await bcrypt.hash(body.password, salt)
    
    user.save().then((newUser)=>{
        let token = jwt.sign({newUserId: newUser.id}, process.env.SECRET_KEY)
        res.status(201).json({newUser, token})
    })


}

module.exports = exports
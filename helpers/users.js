// requirind dependencies needed
let db = require('../models'),
    jwt = require('jsonwebtoken'),
    bcrypt = require('bcrypt'),
    User = require('../models/users')
    

exports.registerUser = async (req, res) =>{
    
    body = req.body

    // checking if email and password fields are empty
    if(!body.email && body.password){
        res.status(401).json({message: 'All fields are required'})
    }

    // creating a newUser outof the User model
    const user = new User(body)

    // generating a salt password
    const salt = await bcrypt.genSalt(10)

    // setting the user password to a hashed password
    user.password = await bcrypt.hash(body.password, salt)
    
    user.ipAddress = req.socket.remoteAddress
    // saving user detials to database
    user.save().then((newUser)=>{
        // generating a token to handle authorization
        let token = jwt.sign({newUserId: newUser.id}, process.env.SECRET_KEY)
        res.status(201).json({newUser, token})
    })
}

// login logic for User
exports.loginUser = async (req, res)=>{

    const body = req.body    
    // checking for admin email in database
    let user = await User.findOne({email: body.email})
        if(user){
            // comparing the inputted password and hashed password using bcrypt
            const validPassword = await bcrypt.compare(body.password, user.password)
            if(validPassword){
                res.status(200).json({message: 'you have successfully logged in'})
            }else{
                res.status(400).json({message: 'password is invalid'})
            }
        }else{
            res.status(400).json({message: 'User acct does not exist'})
        }
}

module.exports = exports
// requiring dependencies needed
require('dotenv').config()

let jwt = require('jsonwebtoken')


exports.loginRequired = async (req, res, next)=>{
    let token = req.headers.authorization.split(" ")[1]

    let decoded = await jwt.verify(token, process.env.SECRET_KEY, (err, decoded)=>{
        if(decoded){
            next()
        }else{
            res.json({message: 'your token doesnt match the secret Key', alert: 'please make sure you are logged in'})
        }
    })
}

exports.ensureCorrectUser = async (req, res, next)=>{
    let token = req.headers.authorization.split(" ")[1]

    let decoded = await jwt.verify(token, process.env.SECRET_KEY, (err, decoded)=>{
        if(decoded && decoded.newAdminId === req.params.id){
            next()
        }else{
            res.json({message: 'your token doesnt match the secret Key', alert: 'please make sure you are logged in'})
        }
    })

}

module.exports = exports
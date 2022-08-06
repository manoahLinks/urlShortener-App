require('dotenv').config()
// defining the dependencies needed
    let db              = require('../models'),
        jwt             = require('jsonwebtoken'),
        bcrypt          = require('bcrypt'),
        nodemailer      = require('nodemailer'),
        smtpTransport   = require('nodemailer-smtp-transport'),
        Admin           = require('../models/admin')

// register logic for Admin
exports.registerAdmin = async (req, res)=>{
    const body = req.body

    // checking if email and password fields are empty
    if(!body.email && body.password){
        return res.status(400).json({message: 'email/password cannot be empty'})
    }

    // creating a new mongoose doc out of our admin model
    const admin = new Admin(body)

    // generating salt to hash password
    const salt = await bcrypt.genSalt(10)

    // setting user password to hashed password
    admin.password = await bcrypt.hash(admin.password, salt)

    admin.ipAddress = req.socket.remoteAddress
    admin.save().then((newAdmin)=>{
        // generating a token using the userId as header and payload 
        let token = jwt.sign({newAdminId: newAdmin.id}, process.env.SECRET_KEY)
        res.status(201).json({newAdmin, token})
    }).catch((err)=>{
        res.json({message: 'this email is already occupied in the database'})
    })
}

// login logic for Admin
exports.loginAdmin = async (req, res)=>{

    const body = req.body    
    // checking for admin email in database
    let admin = await Admin.findOne({email: body.email})
        if(admin){
            // comparing the inputted password and hashed password using bcrypt
            const validPassword = await bcrypt.compare(body.password, admin.password)
            if(validPassword){
                res.status(200).json({message: 'you have successfully logged in'})
            }else{
                res.status(400).json({message: 'password is invalid'})
            }
        }else{
            res.status(400).json({message: 'Admin acct does not exist'})
        }
}

exports.updateAdminProfile = async (req, res)=>{
    db.Admin.findByIdAndUpdate(req.params.id, req.body)
        .then((foundAdmin)=>{
            res.json(foundAdmin)
        })
        .catch((err)=>{
            res.json(err)
        })
}


// logic for viewing all admins in the database
exports.viewAllAdmins = async(req, res)=>{
    Admin.find({}).then((allAdmins)=>{
        res.status(200).json(allAdmins)
    }).catch((err)=>{
        res.status(400).json({message: 'cant find all admins'})
    })
}

exports.adminPasswordRecovery = async(req, res)=>{
    body = req.body

    let foundAdmin = await Admin.findOne({email: body.email})
        .then(async(foundAdmin)=>{

            let transport = nodemailer.createTransport(smtpTransport({
                host: 'smtp.gmail.com',
                secure: true,
                port: 465,
                auth: {
                    user: process.env.EMAIL_USERNAME,
                    pass: process.env.EMAIL_PASSWORD
                }
            }))

            const info = await transport.sendMail({
                from: 'manoahluka@gmail.com',
                to: foundAdmin.email,
                subject: 'this is just a test with nodemailer',
                text: 'As soon as you successfully recieve this email, then we are good to go'
            }, (err, sent)=>{
                if(err){
                    res.json({message: 'sorry the mail server could not be reached at this time!!!', error: err})
                }else{
                    res.json(sent)
                }
            })
        }).catch((err)=>{
            res.status(400).json({message: 'the provided email does not exist in our database' })
        })
}
// exporting all admin route helper functions
module.exports = exports
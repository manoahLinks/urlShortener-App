// requiring dependencies and folders needed
let express = require('express'),
    helpers = require('../helpers/admin'),
    db      = require('../models'),
    router  = express.Router()


router.route('/register')
    .post(helpers.registerAdmin) 

// exporting all routes 
module.exports = router

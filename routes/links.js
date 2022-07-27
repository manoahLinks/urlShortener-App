// requiring dependencies and folders needed
let express = require('express'),
    helpers = require('../helpers/links'),
    router  = express.Router(),
    db      = require('../models')


//defining the index routes for getting and creating links 
router.route('/')
    .get(helpers.displayAllLinks)
    .post(helpers.createNewLink)

// exporting all routes
module.exports = router
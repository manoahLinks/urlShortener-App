// requiring dependencies and folders needed
let express = require('express'),
    helpers = require('../helpers/links'),
    router  = express.Router({mergeParams: true}),
    db      = require('../models')


//defining the index routes for getting and creating links 
router.route('/')
    .get(helpers.displayAllLinks)
    .post(helpers.createNewLink)

router.route('/:linkId')
    .get(helpers.showLinkMoreInfo)
    .put(helpers.updateLink)
    .delete(helpers.deleteLink)    

// exporting all routes
module.exports = router
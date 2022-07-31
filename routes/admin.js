// requiring dependencies and folders needed
let express = require('express'),
    bcrypt  = require('bcrypt'),
    helpers = require('../helpers/admin'),
    db      = require('../models'),
    router  = express.Router()


router.route('/')
    .get(helpers.viewAllAdmins)

router.route('/register')
    .post(helpers.registerAdmin) 

router.route('/login')
    .post(helpers.loginAdmin)  
    
router.route('/:id')
    .put(helpers.updateAdminProfile)    
// exporting all routes 
module.exports = router

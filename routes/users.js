let express = require('express'),
    router  = express.Router(),
    helpers = require('../helpers/users')

router.route('/register')
    .post(helpers.registerUser)

router.route('/login')
    .post(helpers.loginUser)    
    
module.exports = router
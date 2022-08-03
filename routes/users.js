let express = require('express'),
    router  = express.Router(),
    helpers = require('../helpers/users')

router.route('/register')
    .post(helpers.registerUser)

    
module.exports = router
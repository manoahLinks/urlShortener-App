// requiring the dependencies and folders needed
require('dotenv').config()

let express     = require('express'),
    app         = express(),
    bodyParser  = require('body-parser'), 
    adminRoute  = require('./routes/admin'),
    linkRoute   = require('./routes/links'),
    userRoute   = require('./routes/users'),
    db          = require('./models'),
    auth        = require('./middleware/auth'),
    Admin       = require('./models/admin'),
    User        = require('./models/users')
    
// using bodyparser to access request body
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended: true}))

// index route
app.get('/', (req, res)=>{
    res.send('index route')
})


// redirecting a client from the shortened link to the original longUrl address
app.get('/:shorturl',  async(req, res)=>{
    // getting the longurl using the short url
   let foundLink =  await db.Links.findOne({shortUrl: req.params.shorturl})
    
    // increment the clicks of the url found    
    const newClicks = foundLink.clicks += 1

    // updating the clicks in the database
    let updatedClick = await db.Links.findOneAndUpdate({shortUrl: foundLink.shortUrl}, {clicks: newClicks})
        .then((updatedLink)=>{
            console.log(foundLink.longUrl)
            res.redirect(foundLink.longUrl)
        })
        .catch((err)=>{
            res.json(err)
        })
})

// using the admin && link routes 
app.use('/api/admin', adminRoute)
app.use('/api/user', userRoute)
app.use('/api/user/:id/links', linkRoute)
app.use('/api/admin/:id/links', auth.loginRequired, auth.ensureCorrectUser, linkRoute)


// specifying port for server to listen on
app.listen(7777, ()=>{
    console.log(`server is listening !!`)
})    
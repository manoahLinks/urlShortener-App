// requiring the dependencies and folders needed
let express     = require('express'),
    app         = express(),
    bodyParser  = require('body-parser'),
    // passport    = require("passport"),
    // localStrategy = require("passport-local"),
    adminRoute  = require('./routes/admin'),
    linkRoute   = require('./routes/links'),
    Admin       = require('./models/admin')
    
// using bodyparser to access request body
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended: true}))

// index route
app.get('/', (req, res)=>{
    res.send('index route')
})

// using the admin && link routes 
app.use('/api/admin', adminRoute)
app.use('/api/link', linkRoute)

// adding authentication

//requiring and using expression session with our secret key passed 
// app.use(require('express-session')({
//     secret: "this is a secret",
//     resave: false,
//     saveUninitialized: false
// }))

// app.use(passport.initialize())
// app.use(passport.session())
// passport.use(new localStrategy(Admin.authenticate()))

// passport.serializeUser(Admin.serializeUser())
// passport.deserializeUser(Admin.deserializeUser())

// specifying port for server to listen on
app.listen(7777, ()=>{
    console.log(`server is listening !!`)
})    
// importing all libraries
const express = require('express');
const session = require('express-session');
const flash = require('connect-flash');
const indexRouter = require('./routes/index');
const morgan = require('morgan')

// extracting data from env. variables
const {
  SESSION_NAME = "loginSystem",
  PORT = 3000
  } = process.env


// initialize express
const app = express();

// configuration for session management
app.use(session({
    name: SESSION_NAME,  //name of session. which will be use as cookie key
    secret: 'keyboard_cat',  // secret for encryption and decryption of cookie
    resave: false,           // if session data is not modified then session will not be save.
    saveUninitialized: false,  // not to save uninitialize session in session store
    cookie: {                  // cookie configuration
      secure: false,           // set true when application access over https.
      maxAge: 2000 * 60 * 60,   // max age of cookie
      sameSite: true,           // cookie will be used for same domain only
      httpOnly: true            // cookie will not accessible by js
    }
}))

// use to flash a message of login successfully or failure
app.use(flash());
app.set('view engine', 'ejs');              // view engine
app.use(express.static('./public'));         // public directory for static contains
app.use(express.json());                      // post and put data parsing
app.use(express.urlencoded({ extended: false }));

app.use(morgan('dev'))   // logging purpose

// routers
app.use('/', indexRouter);

// handling unhandle routes
app.use((req,res)=>{
  return res.render('404')
})

app.listen(PORT,()=>console.log(`Server is up at ${PORT}`))

// all routes with / will be forwarded here

// importing all libraries
const express = require('express');
const router = express.Router();
const { redirectHome, redirectLogin } = require("../middleware/authMiddleware")  // middlware
const { authenticateUser,registerUser } = require("../controllers/authControllers")  // controllers
const { SESSION_NAME = "loginSystem" } = process.env  // extracting  varibale from env. variables

//  get /
router.get('/', redirectLogin,  (req, res) => {
  res.render('index', { message:  req.flash('message') ,data : JSON.parse(JSON.stringify(req.headers))});
});

// get /login
router.get('/login', redirectHome, (req, res) => {
  res.render('login', { title: 'Login' , message : req.flash('message')  });
});

// get /register
router.get('/register',redirectHome,  (req, res) => {
  res.render('register', { title: 'Register' , message : req.flash('message') });
});

// post /login
router.post('/login',redirectHome, authenticateUser, (req, res) => {
  if(!req.session.userId){     // checking is user autherized with session data
    req.flash('message', 'InValid Credentials!');
    return res.redirect('/login')
  }
    return res.redirect('/')
});

// post /register
router.post('/register',redirectHome , registerUser, (req, res) => {
  return res.redirect('/login')
});

// post /logout
router.post('/logout', redirectLogin, (req, res) => {
  req.session.destroy((err) => {
    if(err){
      return res.redirect("/")
    }
      res.clearCookie(SESSION_NAME)
      return res.redirect("/login")
  })
});

module.exports = router;  // exporting router module

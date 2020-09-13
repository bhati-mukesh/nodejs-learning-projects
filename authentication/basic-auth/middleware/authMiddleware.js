// middleware

// if user is not login. user will be redirected to login page
const redirectLogin = (req,res,next) => {
    if (!req.session.userId){
        // check user is present in session or not
        return res.redirect('/login')
    }
    next()
  }

// if user is login. then redirect to home. this middle specifically use for register and login routes
const redirectHome = (req,res,next) => {
    if(req.session.userId){
        return res.redirect('/')
    }
    next()
  }


// exporting middlewares
module.exports = {
    redirectLogin,
    redirectHome
}
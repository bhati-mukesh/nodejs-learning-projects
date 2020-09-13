// importing required libraries
const fs = require('fs');

// controller for authentication of user
const authenticateUser = (req,res,next) => {
    const {username,password} = req.body   // extracting user credentials from request body
    let users = require('../db/users.json');  // importing users data from json file
    if (username && password){
        const user = users.filter(u =>{
            return (u.username === username && u.password === password)
        })
        if(user.length > 0){                    // if user find then
            req.session.userId = user[0].id
            req.flash('message', 'Login successfully');
        }
    }
    next()           //passing control to next middleware in request-reponse cycle.
}

// controller for user registration
const registerUser = (req,res,next) =>{
    const {username, password, email} = req.body     // extracting user credentials from request body
    if ( username && email && password ){
        let users = require('../db/users.json');
        const user = users.filter(u => {
            return u.username === username
        })
        if(user.length == 0){          // check for uniquess for username
            userObj = { id : users.length+1 , username, password }
            users.push(userObj)                  // adding user to users array
            const data = JSON.stringify(users)
            fs.writeFileSync('./db/users.json', data );         // updating users details in json file
            req.flash('message', 'Account created Successfully!');
        }else{
            req.flash('message', 'UserName is already Registered! Try with other Username');
            return res.redirect('/register')
        }

    }else{
        req.flash('message', 'Insufficient data');
        return res.redirect('/register')
    }

    next()

}

// exporting controller module.
module.exports = {
    authenticateUser,
    registerUser
}
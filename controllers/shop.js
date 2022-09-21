const bcrypt = require("bcryptjs")

const User = require('../models/user');

exports.getHome = (req, res, next) => {
    // check if the user  is already loged in or not

    // give access to home if there is session
    if (req.session.userLoggedIn == true) {
        res.render('shop/home', {
            admin: false
        });
    } else {
        if (req.session.loggedIn === true) {
            res.redirect('/admin/')
        } else {
            res.redirect('auth/login');
        }
    }
}

exports.postHome = (req, res, next) => {

    // save the email and passwored entered by the user
    const user = {
        email: req.body.email,
        password: req.body.password
    }

    // check is there a user with the data that user entered
    User.find({
        email: user.email
    }, (err, data) => {
        if (data.length !== 0) {
            bcrypt.compare(user.password, data[0].password, function (error, isMatch) {
                if (error) {
                    throw error
                } else if (!isMatch) {
                    console.log("Password doesn't match!")
                } else {
                    console.log("Password matches!")
                    if (data[0].admin === false) {
                        req.session.userLoggedIn = true;
                        res.redirect('/');
                    } else {
                        req.session.loggedIn = true;
                        res.redirect('/admin/');
                    }
                }
            })
        } else {
            console.log('user notexist');
            res.redirect('auth/login');
        }
    })
}
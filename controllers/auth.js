const bcrypt = require("bcryptjs") // module to bcrypt password

const User = require('../models/user');

exports.getRegister = (req, res, next) => {
    res.render('auth/register', {
        message: ''
    });
}

exports.registerPost = (req, res, next) => {

    // get all data
    const firstName = req.body.firstName;
    const secondName = req.body.secondName;
    const email = req.body.email;
    const gender = req.body.gender;
    const password = req.body.password;

    const saltRounds = 10; // this is created to bcrypt the password

    // check is user exists allready
    User.find({
        email: email
    }, (err, data) => {

        // save user if email not exist
        if (data.length === 0) {

            // bcrypt the password 
            bcrypt.genSalt(saltRounds, function (saltError, salt) {
                if (saltError) {
                    throw saltError
                } else {
                    bcrypt.hash(password, salt, function (hashError, hash) {
                        if (hashError) {
                            throw hashError
                        } else {
                            const user = new User({
                                firstName: firstName,
                                secondName: secondName,
                                email: email,
                                gender: gender,
                                password: hash,
                                admin: false
                            })

                            // save the user
                            user.save()
                                .then(result => {
                                    console.log("user created");
                                    res.redirect('/auth/login');
                                })
                                .catch(err => {
                                    console.log(err);
                                    res.redirect('/auth/register');
                                })
                        }
                    })
                }
            })
        } else {

            // redirect to register page if it exists the email
            console.log("already exist");
            res.render('auth/register', {
                message: 'email already exists'
            });
        }
    })
}

exports.getLogin = (req, res, next) => {
    if (req.session.loggedIn) {
        res.redirect('/admin/');
    } else {
        if( req.session.userLoggedIn) {
            res.redirect( '/' );
        } else {
            res.render('auth/login', {
                message: ''
            });
        }
    }
}

exports.logout = (req, res, next) => {
    req.session.userLoggedIn = false;
    res.redirect('/');
}
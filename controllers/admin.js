const bcrypt = require("bcryptjs")

const mongoose = require( 'mongoose' );

const Users = require('../models/user');

exports.adminHome = (req, res, next) => {
    if (req.session.loggedIn) {
        Users.find({}, (err, data) => {
            if (data) {
                res.render("admin/home", {
                    admin: true,
                    data
                });
            }
        });
    } else {
        res.redirect("/auth/login");
    }
};

exports.adminLogin = (req, res, next) => {
    res.redirect("/auth/login")
};

exports.createUser = (req, res, next) => {
    res.render('admin/create-user', {
        admin: true
    });
}

exports.postCreate = (req, res, next) => {
    const firstName = req.body.firstName;
    const secondName = req.body.secondName;
    const email = req.body.email;
    const gender = req.body.gender;
    const password = req.body.password;
    const admin = req.body.admin;

    const saltRounds = 10; // this is created to bcrypt the password
    
    // check user exist or not
    Users.find({
        email: email
    }, (err, data) => {
        if (data.length > 0) {
            res.render("error", {
                message: "email already exist"
            });
        } else {
            bcrypt.genSalt(saltRounds, function (saltError, salt) {
                if (saltError) {
                    throw saltError
                } else {
                    bcrypt.hash(password, salt, function (hashError, hash) {
                        if (hashError) {
                            throw hashError
                        } else {
                            const user = new Users({
                                firstName: firstName,
                                secondName: secondName,
                                email: email,
                                gender: gender,
                                password: hash,
                                admin: admin
                            })

                            // save the user
                            user.save()
                                .then(result => {
                                    console.log("user created");
                                    res.redirect('/admin/');
                                })
                                .catch(err => {
                                    console.log(err);
                                    res.redirect('/admin/');
                                })
                        }
                    })
                }
            })
        }
    })
}

exports.editProduct = (req, res, next) => {
    const userId = req.params.userId;
    console.log( userId );
    Users.findById(userId)
        .then(userData => {
            res.render('admin/edit-user', {
                data: userData,
                admin: true,
                message: ''
            });
        });
};

exports.updateUser = (req, res, next) => {

    // get admin entered data
    const userData = {
        id: req.body.id,
        firstName: req.body.firstName,
        secondName: req.body.secondName,
        email: req.body.email,
        admin: req.body.admin === 'false' ? false : true
    }

    // check is the email exist or not
    Users.find({ email: userData.email }, (err, data) => {
        if( data.length > 0 && data[0].id != userData.id ) {
            console.log( "email exist. admin can't update this email" );
            res.render('admin/edit-user', { 
                data: userData,
                admin: true,
                message: "email exist. you can't update data with this email" 
            });
        } else {
            // if email not exists, get the alled data from data base
            Users.findById( userData.id )
                .then( user => {
                    
                    // change the data and save it
                    user.firstName = userData.firstName;
                    user.secondName = userData.secondName;
                    user.email = userData.email;
                    user.admin = userData.admin;
                    return user.save();
                })
                .then( result => {
                    res.redirect("/admin/");
                })
                .catch( err => {
                    console.log( err );
                })
        }
    })
}

exports.deleteProduct = (req, res, next) => {
    const productId = req.body.productId
    Users.findByIdAndRemove(productId)
        .then(() => {
            console.log('deleted');
            res.redirect("/admin");
        })
        .catch(err => {
            console.log(err);
            res.redirect("/admin");
        })
}
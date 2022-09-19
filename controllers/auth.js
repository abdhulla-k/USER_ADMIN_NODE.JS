const User = require( '../models/user' );

exports.getRegister = ( req, res, next ) => {
    res.render( 'auth/register' );
}

exports.registerPost = ( req, res, next ) => {

    // get all data
    const firstName = req.body.firstName;
    const secondName = req.body.secondName;
    const email = req.body.email;
    const gender = req.body.gender;
    const password = req.body.password;
    const admin = false;


    // check is user exists allready
    User.find( { email: email }, ( err, data ) => {

        // save user if email not exist
        if( data.length === 0 ) {
            const user = new User({
                firstName: firstName,
                secondName: secondName,
                email: email,
                gender: gender,
                password: password,
                admin: admin
            })

            // save the user
            user.save()
                .then( result => {
                    console.log( "user created" );
                    res.redirect( '/auth/login' );
                })
                .catch( err => {
                    console.log( err );
                    res.redirect( '/auth/register' );
                })
        } else {

            // redirect to register page if it exists the email
            console.log( "already exist" );
            res.redirect( '/auth/register' );
        }
    })
}

exports.getLogin = ( req, res, next ) => {
    res.render( 'auth/login' );
}
const Users = require( '../models/user' );

exports.adminHome = ( req, res, next ) => {
    const users = Users.find({}, ( err, data ) => {
        if( data ) {
            res.render( "admin/home", { admin: true, data } );
        }
    });
};

exports.adminLogin = ( req, res, next ) => {
    res.redirect( "/auth/login" )
};
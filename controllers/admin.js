exports.adminHome = ( req, res, next ) => {
    res.render( "" )
}

exports.adminLogin = ( req, res, next ) => {
    console.log( "admin" );
    res.redirect( "/auth/login" )
};
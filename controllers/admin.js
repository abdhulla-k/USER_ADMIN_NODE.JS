exports.adminHome = ( req, res, next ) => {
    res.render( "admin/home", { admin: true } )
}

exports.adminLogin = ( req, res, next ) => {
    console.log( "admin" );
    res.redirect( "/auth/login" )
};
exports.register = ( req, res, next ) => {
    res.render( 'auth/register' );
}

exports.login = ( req, res, next ) => {
    res.render( 'auth/login' );
}
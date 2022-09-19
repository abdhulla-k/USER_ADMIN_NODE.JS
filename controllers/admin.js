const Users = require( '../models/user' );

exports.adminHome = ( req, res, next ) => {
    Users.find({}, ( err, data ) => {
        if( data ) {
            res.render( "admin/home", { admin: true, data } );
        }
    });
};

exports.adminLogin = ( req, res, next ) => {
    res.redirect( "/auth/login" )
};

exports.deleteProduct = ( req, res, next ) => {
    const productId = req.body.productId
    Users.findByIdAndRemove( productId )
        .then( () => {
            console.log( 'deleted' );
            res.redirect( "/admin" );
        })
        .catch( err => {
            console.log( err );
            res.redirect( "/admin" );
        })
}
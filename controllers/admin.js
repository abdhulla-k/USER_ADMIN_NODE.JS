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

exports.editProduct = ( req, res, next ) => {
    const productId = req.params.productId;
    Users.findById( productId )
        .then( userData => {
            res.render( 'admin/edit-user', {
                data: userData,
                admin: true
            });
        });
};

exports.updateUser = ( req, res, next ) => {
    const id = req.body.id;
    const firstName = req.body.firstName;
    const secondName = req.body.secondName;
    const email = req.body.email;
    const admin = req.body.admin;

    Users.updateOne( { id: id, admin: admin }, {
        firstName: firstName,
        secondName: secondName,
        email: email
    }).then( () => {
        res.redirect( "/admin/" );
    })
}

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
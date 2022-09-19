const express = require( 'express' );

const router = express.Router()

// import controller
const adminController = require( '../controllers/admin' );

// routers
router.get( '/', adminController.adminHome );

router.get( '/login', adminController.adminLogin );

router.get( '/create', adminController.createUser );

router.post( '/createSave', adminController.postCreate );

router.post( '/delete', adminController.deleteProduct );

router.get( '/edit/:productId', adminController.editProduct );

router.post( '/update', adminController.updateUser );


// export the router
module.exports = router;
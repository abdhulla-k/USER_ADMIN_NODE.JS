const express = require( 'express' );

const router = express.Router()

// import controller
const adminController = require( '../controllers/admin' );

// routers
router.get( '/', adminController.adminHome );

router.get( '/login', adminController.adminLogin );

router.post( '/delete', adminController.deleteProduct )


// export the router
module.exports = router;
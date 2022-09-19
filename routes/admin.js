const express = require( 'express' );

const router = express.Router()

// import controller
const adminController = require( '../controllers/admin' );

// routers
router.get( '/', adminController.adminHome );

router.get( '/login', adminController.adminLogin );


// export the router
module.exports = router;
const express = require( 'express' );

const router = express.Router();

// import conttroller
const authController = require( '../controllers/auth' );

// register router
router.get( '/register', authController.register );

// login router
router.get( '/login', authController.login );

// export router
module.exports = router
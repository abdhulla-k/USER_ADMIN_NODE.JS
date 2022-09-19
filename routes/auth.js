const express = require( 'express' );

const router = express.Router();

// import conttroller
const authController = require( '../controllers/auth' );

// register router
router.get( '/register', authController.getRegister );

// create new account 
router.post( '/create',  authController.registerPost );

// login router
router.get( '/login', authController.getLogin );

// export router
module.exports = router
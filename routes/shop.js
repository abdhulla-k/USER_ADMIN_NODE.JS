// import express
const express = require( 'express' );

// import controller
const shopController = require( '../controllers/shop' );

// use router
const router = express.Router();

router.post( '/', shopController.postHome );

router.get( '/', shopController.getHome );

// export router
module.exports = router;
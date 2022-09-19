const path = require( 'path' );

// import express
const express = require( 'express' );

// import mongoose
const mongoose = require( 'mongoose' );

// set body-parser
const bodyParser = require( 'body-parser' );

app = express();

// set view engin
app.set( 'view engine', 'ejs' );
app.set( 'views', 'views' );

// import routers
const shopRoutes = require( './routes/shop' );
const authRouter = require( './routes/auth' );

// set body-parser
app.use( bodyParser.urlencoded({ extended: false }));   

// set public folder
app.use( express.static( path.join( __dirname, 'public' )));

// use routes
app.use( '/', shopRoutes );
app.use( '/auth', authRouter );


// connect with mongodb and make app listenable from browser
mongoose.connect( "mongodb://localhost:27017/firstP" ).then( data => {
    app.listen( 5000 );
}).catch( err => {
    console.log( err );
})
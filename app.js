// import express
const express = require( 'express' );

// import mongoose
const mongoose = require( 'mongoose' );

app = express();

// set view engin
app.set( 'view engine', 'ejs' );
app.set( 'views', 'views' );

// import routers
const adminRoutes = require( './routes/admin' );

// use routes
app.use( '/', (req, res, next) => {
    res.render( 'shop/home')
})


// connect with mongodb and make app listenable from browser
mongoose.connect( 'mongodb://localhost:27018/week6' )
    .then( data => {
        app.listen( 5000 );
    })
    .catch( err => {
        console.log( err );
    })
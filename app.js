const path = require( 'path' );

// import express
const express = require( 'express' );

// import nocatche and session
const session = require( 'express-session' );
const nocatche = require( 'nocache' );

// import morgan
var morgan = require('morgan'); 

// import mongoose
const mongoose = require( 'mongoose' );

// set body-parser
const bodyParser = require( 'body-parser' );

app = express();

// use session
app.use( session({
    secret: "key",
    saveUninitialized: true,
    resave: false,
    cookie: { maxAge: 6000000 }
}));

app.use( morgan(':method :url :status :res[content-length] - :response-time ms') );

// use nocatche
app.use( nocatche() );

// set view engin
app.set( 'view engine', 'ejs' );
app.set( 'views', 'views' );

// import routers
const shopRoutes = require( './routes/shop' );
const authRouter = require( './routes/auth' );
const adminRoute = require( './routes/admin' );

// set body-parser
app.use( bodyParser.urlencoded({ extended: false }));   

// set public folder
app.use( express.static( path.join( __dirname, 'public' )));

// use routes
app.use( '/', shopRoutes );
app.use( '/auth', authRouter );
app.use( '/admin', adminRoute );


// connect with mongodb and make app listenable from browser
mongoose.connect( "mongodb://localhost:27017/firstP" ).then( data => {
    app.listen( 5000 );
}).catch( err => {
    console.log( err );
})
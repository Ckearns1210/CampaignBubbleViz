var express     = require('express'),
    morgan      = require('morgan'),
    app         = express(),
    router      = express.Router(),
    request     = require('request'),
    mongoose    = require('mongoose'),
    bodyParser  = require('body-parser'),
    port        = process.env.PORT || 80;




//EXPRESS SETUP
app.use(morgan('dev'));
app.use(bodyParser());

//TEMPLATE SETUP
app.set('view engine', 'ejs');
app.use(express.static('public') );
app.use('/bower_components',  express.static(__dirname + '/bower_components'));


//ROUTES
require('./app/routes.js')(app)

//Port and Start
app.listen(port);
console.log('⛷ ⛷ ⛷ ⛷ ⛷ Cool runnings down through port 3000 🏂 🏂 🏂 🏂 🏂');

app.get('/', function (req, res) {
    res.render("I Work");
});

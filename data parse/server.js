var express        = require('express'),
    morgan         = require('morgan'),
    app            = express(),
    router         = express.Router(),
    bodyParser     = require('body-parser'),
    port           = process.env.PORT || 3000,
    fs             = require('fs');





//EXPRESS SETUP
app.use(morgan('dev'));
app.use(bodyParser());

app.use(express.static(__dirname + '/public'));
require('./config/routes.js')(app);
app.use('/bower_components',  express.static(__dirname + '/bower_components'));


//Port and Start
app.listen(port);

app.get('/', function (req, res) {
    res.render("I Work");
});

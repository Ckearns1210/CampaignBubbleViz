var request     = require('request');
    bodyParser  = require('body-parser');

module.exports = function(app) {

app.get('/', function(req, res) {
  res.render('index.ejs');
});

app.get('/bernie', function(req, res) {
  res.render('bernie.ejs');
})

app.get('/hillary', function(req, res){
  res.render('hillary.ejs')
})
};

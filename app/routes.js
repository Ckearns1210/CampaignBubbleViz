var request     = require('request');
    bodyParser  = require('body-parser');

module.exports = function(app) {

app.get('/trump', function(req, res) {
  res.render('trump.ejs');
});

app.get('/bernie', function(req, res) {
  res.render('bernie.ejs');
})

app.get('/', function(req, res){
  res.render('hillary.ejs')
})

app.get('/cruz', function (req, res) {
  res.render('cruz.ejs')
})
};

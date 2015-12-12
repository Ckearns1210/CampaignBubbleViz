module.exports = {
  'url': 'mongodb://localhost/insta', function (err) {
    if(err){
      console.log('connection error', err);
    } else {
      console.log('connection successful');
    }
  }
}

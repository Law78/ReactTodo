var express = require('express');

// Lib standard nodejs
//var sys = require('util');
var exec = require('child_process').exec;

exec("json-server -H "+('0.0.0.0' || '127.0.0.1') +" -p "+ (process.env.PORT || 4000) +" --watch ./fakeServer/db.json",
  function(error, stdout, stderr){
    if(error){
      console.error('exec error: ' + error);
      return;
    }
    console.log(stdout);
  }
);
// Create our app
var app = express();
const PORT = process.env.PORT || 3000;

app.use(function (req, res, next){
  if (req.headers['x-forwarded-proto'] === 'https') {
    res.redirect('http://' + req.hostname + req.url);
  } else {
    next();
  }
});
/*
exec("json-server -p "+ (process.env.PORT || 4000) +" --watch ./fakeServer/db.json");
function puts(error,stdout, stderr){
  conole.log(stdout)
}
*/
app.use(express.static('public'));
app.use('/public/fonts', express.static(__dirname + '/public/fonts'));
app.listen(PORT, function () {
  console.log('Express server is up on port ' + PORT);

});

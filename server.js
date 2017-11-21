var express = require('express');
var app = express();
var path = require('path');

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

app.get('/', function (req, res) {
  res.sendFile(path.join(__dirname + '/index.html'));
});

app.use(express.static('public'));


var server = app.listen(process.env.PORT || 5000, function () {
  var host = server.address().address;
  var port = process.env.PORT || 5000;

  console.log('Example app listening at http://%s:%s', host, port);
});

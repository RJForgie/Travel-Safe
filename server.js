var express = require('express');
var app = express();
var path = require('path');

app.get('/', function (req, res) {
  res.sendFile(path.join(__dirname + '/index.html'));
});

app.use(express.static('public'));


var server = app.listen(process.env.PORT || 3000, function () {
  var host = server.address().address;
  var port = process.env.PORT || 3000;

  console.log('Example app listening at http://%s:%s', host, port);
});

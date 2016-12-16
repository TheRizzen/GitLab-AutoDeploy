var express = require('express');

var app = express();

app.post('/', function(req, res) {
  res.sendStatus(200);
  console.log(req.params);
});

app.listen(9090);

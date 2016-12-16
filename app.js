var express = require('express');
var body-parser = require('body-parser');

var jsonparse = body-parser.json();

var app = express();

app.post('/', jsonparse, function(req, res) {
  res.sendStatus(200);
  console.log(req.body);
});

app.listen(9090);

var express = require('express');
var bodyparser = require('body-parser');
var fs = require('fs');

var config = require('./config.json').projects;

var jsonparse = bodyparser.json();

var app = express();

app.post('/', jsonparse, function(req, res) {
  res.sendStatus(200);  

  var body = req.body;

  config.forEach(function(elem, index) {
    console.log(body.project.name.split('/')[2]);
    if (elem.name == body.project.name && elem.branch == body.project.name.split('/')[2]){
      var git = require('simple-git')(elem.directory);
      git.fetch(function(err, data){
        if (err == null)
          fs.writeFile("/var/log/gitlab-autodeploy/gitlab-autodeploy.log", "[ERROR]: " + err);
        else
          fs.writeFile("/var/log/gitlab-autodeploy/gitlab-autodeploy.log", "[INFO]" + data);
      });
    }
  });
});

app.listen(9123);

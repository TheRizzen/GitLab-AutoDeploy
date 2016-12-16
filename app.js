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
    if (elem.name == body.project.name && elem.branch == body.ref.split('/')[2]){
      var git = require('simple-git')(elem.directory);
      git.fetch(function(err, data){
        console.log('fetch: ', data);
        if (err != null)
          fs.writeFile("/var/log/gitlab-autodeploy/gitlab-autodeploy.log", "[ERROR]: " + err);
        else
          fs.writeFile("/var/log/gitlab-autodeploy/gitlab-autodeploy.log", "[INFO]" + data);
      });
      git.rebase(function (err, data) {
        console.log('rebase: ', data);
        if (err != null)
          fs.writeFile("/var/log/gitlab-autodeploy/gitlab-autodeploy.log", "[ERROR]: " + err);
        else
          fs.writeFile("/var/log/gitlab-autodeploy/gitlab-autodeploy.log", "[info]: " + data);
      });
    }
  });
});

app.listen(9123);

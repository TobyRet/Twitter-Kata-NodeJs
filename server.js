var express = require('express');
var timeline;
var app = function(){
  var bodyParser = require('body-parser');
  var app = express();

  app.use(bodyParser.json());
  app.get('/timeline', echoTimeline);
  app.post('/tweet', postTweet);

  timeline  = [];
  
  return app;
}

function echoTimeline(req, res) {
  asJSON(res);
  res.send(JSON.stringify({timeline: timeline}));
}

function postTweet(req, res){
  asJSON(res);
  req.body.user = 'mob';
  timeline.push(req.body);
  res.sendStatus(205);
}

function asJSON(res) {
  res.setHeader('Content-Type', 'application/json');
}


module.exports = app;
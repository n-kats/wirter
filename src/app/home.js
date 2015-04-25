(function() {
  var express, fs, os, path, router, watchTex;

  os = require('os');

  fs = require('fs');

  path = require('path');

  express = require('express');

  router = express.Router();

  module.exports = function(app) {
    return app.use('/', router);
  };

  router.get('/', function(req, res, next) {
    return res.render('index', {
      title: 'DistLa Editor'
    });
  });

  router.get('/check.json', function(req, res, next) {
    var ar;
    res.contentType('application/json');
    ar = watchTex();
    return res.send(ar);
  });

  watchTex = function() {
    var ar;
    ar = [];
    fs.readdirSync("./tex").forEach(function(f) {
      var d, fp, mtime, x;
      fp = path.resolve('./tex', f);
      mtime = fs.statSync(fp).mtime;
      d = fs.readFileSync(fp);
      x = {
        "fileName": f,
        "text": d.toString(),
        "mtime": mtime
      };
      return ar.push(x);
    });
    return ar;
  };

}).call(this);

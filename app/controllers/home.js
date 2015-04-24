var os = require('os'),
    fs = require('fs'),
    path = require('path'),
    express = require('express'),
    router = express.Router();
  //Article = require('../models/article');

module.exports = function (app) {
  app.use('/', router);
};

router.get('/', function (req, res, next) {
  res.render('index', {
    title: 'Generator-Express MVC'
  });
});

router.get('/check.json', function (req, res, next) {
  res.contentType('application/json');
  // console.log(req.query);

  var ar = watchTex();
  console.log(ar);
  res.send(ar);
});


function watchTex(){
  var ar = [];
  fs.readdirSync("./tex").forEach(function(f){
    var fp = path.resolve('./tex', f);
    var mtime = fs.statSync(fp).mtime;
    var d = fs.readFileSync(fp);
    var x = {
      "fileName": f,
      "text": d.toString(),
      "mtime": mtime
    };
    ar.push(x);
  });
  return ar;
}

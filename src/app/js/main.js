(function() {
  var addingData, fs, icon, jikoku, kaigyou, loadTex, os, panel, path, watchTex, well;

  loadTex = function() {
    var json;
    json = watchTex();
    $("#main").text("");
    json.sort(function(a, b) {
      return a.mtime < b.mtime;
    }).forEach(function(d) {
      return $("#main").append(addingData(d));
    });
    MathJax.Hub.Queue(["Typeset", MathJax.Hub]);
  };

  addingData = function(d) {
    return well(d.fileName + " ----  " + jikoku(d.mtime), kaigyou(d.text), d.fileName);
  };

  icon = function(x) {
    return '<i class="' + x + '"></i>';
  };

  well = function(h, b, id) {
    return '<div class="well" id="' + id + '">' + '<h3>' + icon('mdi-editor-mode-edit') + h + '</h3>' + b + '</div>';
  };

  panel = function(h, b, id) {
    return '<div class="panel panel-info" id="' + id + '">' + '<div class="panel-heading">' + '<h3 class="panel-title">' + h + '</h3>' + '</div>' + '<div class="panel-body">' + b + '</div>' + '</div>';
  };

  jikoku = function(t) {
    var h, m, tt;
    tt = new Date(t);
    h = tt.getHours();
    m = tt.getMinutes();
    return "" + h + ":" + m;
  };

  kaigyou = function(st) {
    return st.split(/(\r\n\r\n|\n\n)/).join("<br>");
  };

  os = require('os');

  fs = require('fs');

  path = require('path');

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

  $(function() {
    loadTex();
    return setInterval(loadTex, 30000);
  });

}).call(this);

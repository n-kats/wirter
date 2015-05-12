(function() {
  var addingData, fs, icon, jikoku, kaigyou, loadTex, os, panel, path, watchTex, well;

  loadTex = function(dir) {
    var json;
    json = watchTex(dir);
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
    return "<i class=\"" + x + "\"></i>";
  };

  well = function(h, b, id) {
    return "<div class=\"well\" id=\"" + id + "\">\n<h3>" + (icon('mdi-editor-mode-edit')) + h + "</h3>\n" + b + "\n</div>";
  };

  panel = function(h, b, id) {
    return "<div class=\"panel panel-info\" id=\"" + id + "\">\n  <div class=\"panel-heading\">\n    <h3 class=\"panel-title\">" + h + "</h3>\n  </div>\n  <div class=\"panel-body\">b</div>\n</div>";
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

  watchTex = function(dir) {
    var ar;
    ar = [];
    fs.readdirSync(dir).forEach(function(f) {
      var d, fp, mtime, x;
      fp = path.resolve(dir, f);
      mtime = fs.statSync(fp).mtime;
      d = fs.readFileSync(fp);
      x = {
        "fileName": f,
        "text": d.toString(),
        "mtime": mtime
      };
      if (x.fileName.match(/\.tex$/)) {
        return ar.push(x);
      }
    });
    return ar;
  };

  $(function() {
    var d;
    d = null;
    $('#inputDir').change(function() {
      return d = $('#inputDir').get(0).files[0].path;
    });
    return setInterval(function() {
      if (d) {
        return loadTex(d);
      }
    }, 5000);
  });

}).call(this);

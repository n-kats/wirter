$(function(){
  loadTex();
  setInterval(loadTex, 30000);
});

function loadTex(){
  $.getJSON("/check.json", {}, function(json){
    $("#main").text("");

    json.sort(function(a,b){
      return a.mtime < b.mtime
    }).forEach(function(d){
      $("#main").append(addingData(d));
    });
    MathJax.Hub.Queue(["Typeset", MathJax.Hub]);
  });
}


function addingData(d){
  var x  = "<div id="+ d.fileName + ">"
    + "<h2>"+d.fileName+" ----  "+ jikoku(d.mtime)+"</h2>"
    + kaigyou(d.text)
    + "</div>";
  return x
}

function jikoku(t){
  tt = new Date(t);
  var h = tt.getHours();
  var m = tt.getMinutes();
  return "" + h + ":"+m;
}

function kaigyou(st){
  return "<p>" + st.split(/(\r\n\r\n|\n\n)/).join("</p><p>") + "</p>";
}

$(function(){
  loadTex();
  setInterval(loadTex, 30000);
});

function loadTex(){
  $.getJSON("/check.json", {}, function(json){
    $("#main").text("");

    json.sort(function(a,b){
      return a.mtime < b.mtime;
    }).forEach(function(d){
      $("#main").append(addingData(d));
    });
    MathJax.Hub.Queue(["Typeset", MathJax.Hub]);
  });
}


function addingData(d){
  return well(d.fileName+" ----  "+ jikoku(d.mtime), kaigyou(d.text),d.fileName );
}

function icon(x){
  return '<i class="'+x+'"></i>';
}

function well(h,b,id){
  return '<div class="well" id="'+id+'">'
    + '<h3>'+ icon('mdi-editor-mode-edit') + h + '</h3>'
    + b
    + '</div>';
}
function panel(h,b,id){
  return '<div class="panel panel-info" id="'+id+'">'
    + '<div class="panel-heading">'
    + '<h3 class="panel-title">' + h + '</h3>'
    + '</div>'
    + '<div class="panel-body">'
    + b
    + '</div>'
    + '</div>';
}

function jikoku(t){
  tt = new Date(t);
  var h = tt.getHours();
  var m = tt.getMinutes();
  return "" + h + ":"+m;
}

function kaigyou(st){
  return st.split(/(\r\n\r\n|\n\n)/).join("<br>");
}

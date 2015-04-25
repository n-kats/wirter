
loadTex = ->
  json = watchTex()
  $("#main").text("")

  json.sort (a,b) ->
    return a.mtime < b.mtime
  .forEach (d) ->
    $("#main").append(addingData(d))

  MathJax.Hub.Queue(["Typeset", MathJax.Hub])
  return

addingData = (d)->
  well(d.fileName+" ----  "+ jikoku(d.mtime), kaigyou(d.text),d.fileName )

icon = (x) ->
  '<i class="'+x+'"></i>'

well = (h,b,id) ->
  '<div class="well" id="'+id+'">' +
  '<h3>'+ icon('mdi-editor-mode-edit') + h + '</h3>' +
  b +
  '</div>'

panel = (h,b,id) ->
  '<div class="panel panel-info" id="'+id+'">' +
  '<div class="panel-heading">' +
  '<h3 class="panel-title">' + h + '</h3>' +
  '</div>' +
  '<div class="panel-body">' +
  b +
  '</div>' +
  '</div>'

jikoku = (t) ->
  tt = new Date(t)
  h = tt.getHours()
  m = tt.getMinutes()
  "" + h + ":"+m


kaigyou = (st) ->
  st.split(/(\r\n\r\n|\n\n)/).join("<br>")



os = require('os')
fs = require('fs')
path = require('path')

watchTex = ->
  ar = []
  fs.readdirSync("./tex").forEach (f) ->
    fp = path.resolve('./tex', f)
    mtime = fs.statSync(fp).mtime
    d = fs.readFileSync(fp)
    x =
      "fileName": f
      "text": d.toString()
      "mtime": mtime
    ar.push(x)
  ar

$ ->
  loadTex();
  setInterval(loadTex, 30000)

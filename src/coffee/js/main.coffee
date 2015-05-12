
loadTex = (dir) ->
  json = watchTex(dir)
  $("#main").text("")

  json.sort (a,b) ->
    a.mtime < b.mtime
  .forEach (d) ->
    $("#main").append(addingData(d))

  MathJax.Hub.Queue(["Typeset", MathJax.Hub])
  return

addingData = (d)->
  well(d.fileName+" ----  "+ jikoku(d.mtime), kaigyou(d.text),d.fileName )

icon = (x) ->
  "<i class=\"#{x}\"></i>"

well = (h,b,id) ->
  """
  <div class="well" id="#{id}">
  <h3>#{icon('mdi-editor-mode-edit')}#{h}</h3>
  #{b}
  </div>
  """
panel = (h,b,id) ->
  """
  <div class="panel panel-info" id="#{id}">
    <div class="panel-heading">
      <h3 class="panel-title">#{h}</h3>
    </div>
    <div class="panel-body">#{b}</div>
  </div>
  """
jikoku = (t) ->
  tt = new Date(t)
  h = tt.getHours()
  m = tt.getMinutes()
  if m < 10
    "" + h + ":0"+m
  else
    "" + h + ":"+m

kaigyou = (st) ->
  st.split(/(\r\n\r\n|\n\n)/).join("<br>")



os = require('os')
fs = require('fs')
path = require('path')

watchTex = (dir) ->
  ar = []
  # console.log dir
  fs.readdirSync(dir).forEach (f) ->
    fp = path.resolve(dir, f)
    mtime = fs.statSync(fp).mtime
    d = fs.readFileSync(fp)
    x =
      "fileName": f
      "text": d.toString()
      "mtime": mtime
    if x.fileName.match /\.tex$/
      ar.push(x)
  ar

$ ->
  d = null
  # loadTex()
  $('#inputDir').change () ->
    # 通常chromeと挙動異なる
    d = $('#inputDir').get(0).files[0].path
    # $('#dev').text(d)
  setInterval(()->
    if d
      loadTex(d)
  , 5000)

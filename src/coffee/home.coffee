os = require('os')
fs = require('fs')
path = require('path')
express = require('express')
router = express.Router()

module.exports = (app)->
  app.use('/', router)

router.get '/', (req, res, next) ->
  res.render 'index',
    title: 'DistLa Editor'

router.get '/check.json', (req, res, next) ->
  res.contentType('application/json')
  ar = watchTex()
  res.send(ar)

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

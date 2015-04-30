module.exports = {}
module.exports.transform = transform
module.exports.transformFile = transformFile

var fs = require('fs')
var compile = require('./compiler/compile')

function transform (code, opts) {
  opts = opts || {}
  opts.babel = opts.babel || {}

  var result = compile(code, opts)

  return result
}

function transformFile (filename, opts, callback) {
  fs.readFile(filename, 'utf8', function (err, code) {
    if (err) {
      return callback(err)
    }

    var result
    try {
      result = transform(code, opts)
    } catch (err) {
      return callback(err)
    }

    return callback(null, result)
  })
}

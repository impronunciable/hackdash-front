
var webpack = require('webpack')
var frontConfig = require('./webpack.config.front')
var backConfig = require('./webpack.config.back')

var front = webpack(frontConfig)
var back = webpack(backConfig)

front.watch({}, function(){})
back.watch({}, function(){})

process.on('uncaughtException', function(err) {
  console.log(err)
})

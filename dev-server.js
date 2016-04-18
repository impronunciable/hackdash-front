
var webpack = require('webpack')
var pm2 = require('pm2')
var frontConfig = require('./webpack.config.front')
var backConfig = require('./webpack.config.back')

var front = webpack(frontConfig)
var back = webpack(backConfig)

front.watch({}, function(){})
back.watch({}, function(){
  pm2.connect(true, function(err) {
    pm2.start({
      script    : 'build/backend.js'
    }, {watch: true}, function(err, apps) {
      pm2.disconnect();
    });
  });
})

process.on('uncaughtException', function(err) {
  console.log(err)
})

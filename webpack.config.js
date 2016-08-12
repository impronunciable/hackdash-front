
/** Module dependencies **/

const path = require('path')

const sharedConfig = {
  module: {
    loaders: [
      { test: /\.js$/, exclude: /node_modules/, loader: 'babel-loader' },
      { test: /\.json$/, loader: 'json-loader' }
    ]
  },
  resolve: {
    root: [require.resolve('./src')]
  }
}

const frontConfig = {
  entry: './src/index.js',
  output: {
    path: path.join(__dirname, 'public'),
    filename: 'frontend.js'
  }
}

const backConfig = {
  entry: './server.js',
  output: {
    path: __dirname,
    filename: 'server-build.js'
  },
  target: 'node'
}

module.exports = [
  Object.assign({}, sharedConfig, frontConfig),
  Object.assign({}, sharedConfig, backConfig)
]

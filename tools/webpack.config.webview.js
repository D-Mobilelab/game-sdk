var path = require('path');
var babelLoader = {
  test: /\.jsx?$/,
  exclude: /(bower_components|node_modules)/,
  loader: 'babel-loader'
}

module.exports = {
  entry: [
    './src/sdk.webview.js',
  ],
  output: {
    path: path.resolve('dist'),
    filename: 'gfsdk.webview.js',
    libraryTarget: 'umd',
    library: 'GamifiveSDK',
  },
  module: {    
    rules: [babelLoader]
  }
}

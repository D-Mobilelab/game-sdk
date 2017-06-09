var path = require('path');

module.exports = {
  entry: [
    './src/sdk.webview.js',
  ],
  output: {
    path: path.resolve('dist'),
    filename: 'gfsdk.webview.js',
    libraryTarget: 'umd',
    library: 'GamifiveSDK',
  }
}

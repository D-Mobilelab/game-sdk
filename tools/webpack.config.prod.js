var path = require('path');
var webpack = require('webpack');
var baseConfiguration = require('./webpack.config.base');

var FILENAME = 'gfsdk.min.js';
var FILENAME_HYBRID = 'gfsdk.hybrid.min.js';

var prodConfiguration = Object.create(baseConfiguration);
var ROOT_DIRECTORY = null;

if(process.env.ROOT_DIRECTORY) {
  console.log("ROOT DIRECTORY", process.env.ROOT_DIRECTORY);
  ROOT_DIRECTORY = process.env.ROOT_DIRECTORY;
  prodConfiguration.output.publicPath = ROOT_DIRECTORY;
}

prodConfiguration.output.filename = process.env.APP_ENV === "WEB" ? FILENAME : FILENAME_HYBRID;
prodConfiguration.devtool = 'source-map';

prodConfiguration.plugins = [
  new webpack.DefinePlugin({
    'process.env.APP_ENV': JSON.stringify(process.env.APP_ENV),
    'process.env': { NODE_ENV: JSON.stringify(process.env.NODE_ENV) }
  }),
  new webpack.optimize.UglifyJsPlugin({
    minimize: true,
    output: {
      comments: false,
    },
    sourceMap: true,
    compress: { warnings: false, screw_ie8: true },
  }),
];

module.exports = prodConfiguration;
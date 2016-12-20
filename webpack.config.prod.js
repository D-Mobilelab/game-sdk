var path = require('path');
var webpack = require('webpack');
var baseConfiguration = require('./webpack.config.base');

var prodConfiguration = Object.create(baseConfiguration);
prodConfiguration.output.filename = 'gfsdk.min.js';
prodConfiguration.devtool = 'source-map';
prodConfiguration.plugins = [
  new webpack.optimize.OccurenceOrderPlugin(),
  new webpack.DefinePlugin({ 'process.env.NODE_ENV': JSON.stringify('production') }),
  new webpack.optimize.UglifyJsPlugin({ compressor: { warnings: false } }),
];

module.exports = prodConfiguration;
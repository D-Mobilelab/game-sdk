var path = require('path');
var webpack = require('webpack');
var baseConfiguration = require('./webpack.config.base');
var ROOT_DIRECTORY = 'http://d2.motime.com/js/wl/webstore_html5game/gfsdk/3.x.x/dist/';

var prodConfiguration = Object.create(baseConfiguration);
prodConfiguration.output.filename = 'gfsdk.js';
prodConfiguration.output.publicPath = ROOT_DIRECTORY;
prodConfiguration.output.path = path.resolve(__dirname, 'dist');
prodConfiguration.devtool = 'source-map';
prodConfiguration.plugins = [
  new webpack.DefinePlugin({ 'process.env.NODE_ENV': JSON.stringify('preprod') }),
  // new webpack.optimize.UglifyJsPlugin({ compressor: { warnings: false } }),
];

module.exports = prodConfiguration;
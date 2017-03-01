var path = require('path');
var webpack = require('webpack');
var baseConfiguration = require('./webpack.config.base');
var ROOT_DIRECTORY = 'http://d.motime.com/js/wl/webstore_html5game/gfsdk/3.x.x/dist/';

var prodConfiguration = Object.create(baseConfiguration);
prodConfiguration.output.filename = 'gfsdk.min.js';
prodConfiguration.output.publicPath = ROOT_DIRECTORY;
prodConfiguration.devtool = 'source-map';
prodConfiguration.plugins = [
  new webpack.DefinePlugin({ 'process.env.NODE_ENV': JSON.stringify('production') }),
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
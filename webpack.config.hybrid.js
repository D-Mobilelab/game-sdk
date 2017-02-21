var path = require('path');
var webpack = require('webpack');
var baseConfiguration = require('./webpack.config.base');
var ROOT_DIRECTORY = '/';

var prodConfiguration = Object.create(baseConfiguration);
prodConfiguration.output.filename = 'gfsdk.js';
prodConfiguration.output.publicPath = ROOT_DIRECTORY;
prodConfiguration.output.path = path.resolve(__dirname, 'hybrid');
prodConfiguration.devtool = 'source-map';
prodConfiguration.plugins = [
  new webpack.DefinePlugin({ 
    'process.env.NODE_ENV': JSON.stringify('production'),
    'process.env.APP_ENV': JSON.stringify('hybrid')
  }),
  // new webpack.optimize.UglifyJsPlugin({ compressor: { warnings: false } }),
];

module.exports = prodConfiguration;
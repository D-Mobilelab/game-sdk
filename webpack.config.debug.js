var path = require('path');
var webpack = require('webpack');
var baseConfiguration = require('./webpack.config.base');

var devConfiguration = Object.create(baseConfiguration);

var optimizeOccurence = new webpack.optimize.OccurenceOrderPlugin();
var env_Plugin = new webpack.DefinePlugin({ 'process.env': { 'NODE_ENV': JSON.stringify('debug') } });

devConfiguration.output.filename = 'gfsdk.debug.js';
devConfiguration.devtool = 'eval-source-map';
devConfiguration.plugins.push(optimizeOccurence);
devConfiguration.plugins.push(env_Plugin);

module.exports = devConfiguration;
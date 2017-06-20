var path = require('path');
var webpack = require('webpack');
var baseConfiguration = require('./webpack.config.base');

var devConfiguration = Object.create(baseConfiguration);

var FILENAME = '[name].js';
var FILENAME_HYBRID = '[name].hybrid.js';

var envPlugin = new webpack.DefinePlugin({    
    'process.env': {
      'APP_ENV': JSON.stringify(process.env.APP_ENV),
      NODE_ENV: JSON.stringify(process.env.NODE_ENV) 
    }
});

var ROOT_DIRECTORY = null;

if(process.env.ROOT_DIRECTORY) {
  console.log("ROOT DIRECTORY", process.env.ROOT_DIRECTORY);
  ROOT_DIRECTORY = process.env.ROOT_DIRECTORY;
  devConfiguration.output.publicPath = ROOT_DIRECTORY;
}

devConfiguration.output.filename = process.env.APP_ENV === "WEB" ? FILENAME : FILENAME_HYBRID;

devConfiguration.devtool = 'eval-source-map';
devConfiguration.plugins.push(envPlugin);

module.exports = devConfiguration;

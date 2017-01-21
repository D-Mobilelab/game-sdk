var path = require('path');
var webpack = require('webpack');
var baseConfiguration = require('./webpack.config.base');

var devConfiguration = Object.create(baseConfiguration);

var optimizeOccurence = new webpack.optimize.OccurenceOrderPlugin();
var env_Plugin = new webpack.DefinePlugin({ 'process.env': { 'NODE_ENV': JSON.stringify('debug') } });

devConfiguration.devServer = { 
    contentBase: 'debug/',
    host: 'local.appsworld.gamifive-app.com',
    proxy: {
      '/v01/**': {
        target: 'http://www2.gameasy.com/ww-it/',
        secure: false,
        changeOrigin: true,
        historyApiFallback: true,
        pathRewrite: {
          '': ''
        },
        cookieDomainRewrite:{'*':''}
      }
    }
};


devConfiguration.output.path = path.resolve(__dirname, "debug");
devConfiguration.output.filename = 'gfsdk.debug.js';
devConfiguration.devtool = 'eval-source-map';
devConfiguration.plugins.push(optimizeOccurence);
devConfiguration.plugins.push(env_Plugin);

module.exports = devConfiguration;
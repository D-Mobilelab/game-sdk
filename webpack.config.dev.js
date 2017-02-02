var path = require('path');
var webpack = require('webpack');
var baseConfiguration = require('./webpack.config.base');

var devConfiguration = Object.create(baseConfiguration);

var optimizeOccurence = new webpack.optimize.OccurenceOrderPlugin();
var env_Plugin = new webpack.DefinePlugin({ 'process.env': { NODE_ENV: JSON.stringify('development') } });

devConfiguration.devServer = {
  contentBase: 'dist/',
  host: 'local.appsworld.gamifive-app.com', // 0.0.0.0 to test on device. then add <ip>:8080/webpack-dev-server/
  proxy: {
    '/v01/**': {
      target: 'http://appsworld.gamifive-app.com',
      secure: false,
      changeOrigin: true,
      historyApiFallback: true,
      pathRewrite: {
        '': '',
      },
      cookieDomainRewrite: { '*': '' },
    }
  }
}

devConfiguration.devtool = 'eval-source-map';
devConfiguration.plugins.push(optimizeOccurence);
devConfiguration.plugins.push(env_Plugin);

module.exports = devConfiguration;

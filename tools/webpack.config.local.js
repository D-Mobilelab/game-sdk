var path = require('path');
var webpack = require('webpack');
var baseConfiguration = require('./webpack.config.base');

var devConfiguration = Object.create(baseConfiguration);

var hotPlugin = new webpack.HotModuleReplacementPlugin();
var envPlugin = new webpack.DefinePlugin({    
    'process.env': { 
      NODE_ENV: JSON.stringify(process.env.NODE_ENV),
      APP_ENV: JSON.stringify(process.env.APP_ENV),
      LOCAL_DEV: true
    }
});

var ROOT_DIRECTORY = null;

/*if(process.env.ROOT_DIRECTORY) {
  console.log("ROOT DIRECTORY", process.env.ROOT_DIRECTORY);
  ROOT_DIRECTORY = process.env.ROOT_DIRECTORY;
  devConfiguration.output.publicPath = ROOT_DIRECTORY;
}*/

var HOSTNAME = 'local.appsworld.gamifive-app.com';
// var HOSTNAME = '0.0.0.0';
//devConfiguration.entry.push('webpack/hot/dev-server');
//devConfiguration.entry.push('webpack-dev-server/client?http://' + HOSTNAME + ':8080');


devConfiguration.devServer = {
  inline: true,
  hot: true,
  contentBase: 'sample/',
  host: HOSTNAME, // 0.0.0.0 to test on device. then add <ip>:8080/webpack-dev-server/
  disableHostCheck: true,
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
devConfiguration.plugins.push(envPlugin);
devConfiguration.plugins.push(hotPlugin);

module.exports = devConfiguration;

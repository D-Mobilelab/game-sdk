/* eslint-disable */

var path = require('path');
var webpack = require('webpack');
var baseConfiguration = require('./webpack.config.base');
var modifyResponse = require('node-http-proxy-json');
if(!process.env.SERVICE || process.env.SERVICE === '') { console.warn('Please set SERVICE env variable: export SERVICE=bandai|gameasy|gamifive'); }
var localvhost = require('./local/' + process.env.SERVICE + '/vhost.json').config;
var SERVICE = require('./local/' + process.env.SERVICE + '/vhost.json').domain;
console.warn(process.env.SERVICE, SERVICE, localvhost);
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

var PROTOCOL = 'http://';
var LOCAL = 'local';
var HOSTNAME = LOCAL + '.' + SERVICE;
HOSTNAME = '0.0.0.0';
var TARGET = PROTOCOL + SERVICE;
// devConfiguration.entry.push('webpack/hot/dev-server');
// devConfiguration.entry.push('webpack-dev-server/client?http://' + HOSTNAME + ':8080');

devConfiguration.devServer = {
  open: false,
  inline: true,
  hot: true,
  contentBase: 'sample/',
  host: HOSTNAME, // 0.0.0.0 to test on device. then add <ip>:8080/
  disableHostCheck: true,
  proxy: {
    '/**/v01/**': {
      onProxyReq: function(proxyReq, req, res) { 
        console.log('Request:', proxyReq.path);
      },
      onProxyRes: function(proxyRes, req, res) {
        console.log("Response", req.path);
        if(req.path === '/ww-it/v01/config.getvars') {
          delete proxyRes.headers['content-length'];
          modifyResponse(res, proxyRes.headers['content-encoding'] ? proxyRes.headers['content-encoding'] : proxyRes.headers['transfer-encoding'], function (body) {
            if (body) {
              // replace some keys with locals
              for(var key in localvhost) {
                body[key] = localvhost[key];
              }
              console.log('Keys added', localvhost);              
            }
            return body;
          });
        }
      },      
      target: TARGET,
      secure: false,
      changeOrigin: true,
      historyApiFallback: true,
      pathRewrite: function (path, req) { return path.replace('', '') },
      cookieDomainRewrite: {
        SERVICE: SERVICE
      }
    },
    '/**/dictionary': {
      target: TARGET,
      changeOrigin: true,
      historyApiFallback: true,
    }
  }
}

devConfiguration.devtool = 'eval-source-map';
devConfiguration.plugins.push(envPlugin);
devConfiguration.plugins.push(hotPlugin);

module.exports = devConfiguration;

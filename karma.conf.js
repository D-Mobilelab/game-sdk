var webpackConfig = require('./webpack.config.base.js');
var webpack = require('webpack');
module.exports = function (config) {
  config.set({

    // Add any browsers here
    browsers: ['PhantomJS', 'Chrome'],
    frameworks: ['jasmine'],

    // The entry point for our test suite
    basePath: '.',
    autoWatch: false,
    files: ['webpack.tests.js'],
    preprocessors: {
      // Run this through webpack, and enable inline sourcemaps
      'webpack.tests.js': ['webpack', 'sourcemap'],
    },

    webpack: {
      entry: ["webpack.tests.js"],
      output: {
        path: __dirname + 'tests',
      },
      devtool: 'inline-sourcemap',
      module: {
        loaders: [
          { test: /\.js$/, exclude: /(bower_components|node_modules)/, loader: 'babel-loader' },
        ],
      },
      plugins: [
        new webpack.DefinePlugin({ 'process.env': { NODE_ENV: JSON.stringify('test') } })
      ],
    },
    client: {
      // log console output in our test console
      captureConsole: true,
    },

    reporters: ['mocha', 'dots'],
    singleRun: true, // exit after tests have completed

    webpackMiddleware: {
      noInfo: true,
    },

    // Webpack takes a little while to compile -- this manifests as a really
    // long load time while webpack blocks on serving the request.
    browserNoActivityTimeout: 60000, // 60 seconds

  });
};

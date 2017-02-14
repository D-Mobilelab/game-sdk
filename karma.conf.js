var webpackConfig = require('./webpack.config.base.js');
var path = require('path');
var webpack = require('webpack');

module.exports = function (config) {
  config.set({
    coverageReporter: {
      reporters: [
        { type: 'html', subdir: 'html' },
        { type: 'lcovonly', subdir: '.' },
        { type: 'text' },
      ],
    },
    // Add any browsers here
    browsers: ['PhantomJS'],
    frameworks: ['jasmine'],

    // The entry point for our test suite
    basePath: '',
    autoWatch: false,
    files: ['tests.webpack.js'],
    preprocessors: {
      // Run this through webpack, and enable inline sourcemaps
      'tests.webpack.js': ['webpack', 'sourcemap'],
    },

    webpack: {
      cache: true,
      devtool: 'inline-sourcemap',
      module: {
        preLoaders: [
          {
            test: /-test\.js$/,
            include: /src/,
            exclude: /(bower_components|node_modules)/,
            loader: 'babel-loader',
            query: {
              cacheDirectory: true,
            },
          },
          {
            test: /\.js?$/,
            include: /src/,
            exclude: /(node_modules|bower_components|__tests__)/,
            loader: 'babel-istanbul',
            query: {
              cacheDirectory: true,
            },
          },
        ],
        loaders: [
          {
            test: /\.js$/,
            exclude: /(bower_components|node_modules)/,
            loader: 'babel-loader',
          },
        ],
      },
      plugins: [
        new webpack.DefinePlugin({ 'process.env': { NODE_ENV: JSON.stringify('test') } }),
      ],
    },
    client: {
      // log console output in our test console
      captureConsole: true,
    },
    reporters: ['spec', 'coverage'],
    singleRun: true, // exit after tests have completed

    webpackMiddleware: {
      noInfo: true,
    },

    // Webpack takes a little while to compile -- this manifests as a really
    // long load time while webpack blocks on serving the request.
    browserNoActivityTimeout: 60000, // 60 seconds

  });
};

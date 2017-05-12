var webpackConfig = require('./tools/webpack.config.base.js');
var path = require('path');
var webpack = require('webpack');

var envPlugin = new webpack.DefinePlugin({ 
  'process.env': { NODE_ENV: JSON.stringify(process.env.NODE_ENV) }
});
webpackConfig.plugins.push(envPlugin);
webpackConfig.externals = {
  'react/addons': true,
  'react/lib/ExecutionEnvironment': true,
  'react/lib/ReactContext': true
};

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
    autoWatch: true,
    files: [
      'tests.webpack.js',
    ],
    preprocessors: {
      // Run this through webpack, and enable inline sourcemaps
      'tests.webpack.js': ['webpack', 'sourcemap'],
    },
    webpack: webpackConfig,
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

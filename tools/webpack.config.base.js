/* eslint-disable */
var path = require('path');
var webpack = require('webpack');

var babelLoader = {
  test: /\.jsx?$/,
  exclude: /(bower_components|node_modules)/,
  loader: 'babel-loader'
}

var devConfiguration = {
  entry: {
    gfsdk: './src/index.js',
    vendor: [
      'react',
      'react-dom',
      'redux',
      'react-redux',
      'axios',
      'docomo-utils',
      'redux-thunk',
      'localforage',
      'newton-adapter',
      'facebookpixeladapter',
      'raven-js',
      'raven-for-redux'
    ]
  },
  output: {
    path: path.resolve('dist'),
    auxiliaryComment: 'Docomo digital Game SDK - JS Library',
    publicPath: '/',
    filename: '[name].js',
    library: {
      root: "GamifiveSDK",
      amd: "docomo-game-sdk",
      commonjs: "docomo-game-sdk"
    },
    libraryTarget: "umd"
  },
  module: {
    noParse: /node_modules\/localforage\/dist\/localforage.js/,
    rules: [
      babelLoader,
      {
        test: /\.css$/,
        exclude: /(bower_components|node_modules)/,
        use: [
          { loader: 'style-loader' },
          {
            loader: 'css-loader',
            options: {
              modules: true,
              importLoaders: 1,
              localIdentName: '[name]_[local]_[hash:base64:5]',
            }
          },
          {
            loader: 'postcss-loader',
          }
        ]
      },
      {
        test: /\.(png|jpe?g|gif|svg|woff|woff2|ttf|eot|ico)$/,
        exclude: /node_modules/,
        use: [
          {
            loader: 'file-loader',
            options: { name: 'assets/[name].[ext]' }
          }
        ]
      },
    ],
  },
  plugins: [
    new webpack.optimize.CommonsChunkPlugin({
      name: 'vendor',
      // (the commons chunk name)


      // (the filename of the commons chunk)

      // minChunks: 3,
      // (Modules must be shared between 3 entries)

      // chunks: ["pageA", "pageB"],
      // (Only use these entries)
      minChunks: 3,
    }),
  ],
  // module end
  resolve: {
    extensions: ['.js', '.es6', '.jsx'],
  },
  externals: {
    // require("jquery") is external and available
    //  on the global var jQuery
    newton: "Newton"
  }
};

module.exports = devConfiguration;

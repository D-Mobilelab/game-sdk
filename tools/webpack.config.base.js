var path = require('path');

var babelLoader = {
  test: /\.jsx?$/,
  exclude: /(bower_components|node_modules)/,
  loader: 'babel-loader'
}

if(process.env.NODE_ENV === 'test') {  
  babelLoader.options = { plugins: 'rewire' };
}

var devConfiguration = {
  entry: [
    './src/index.js',
  ],
  output: {
    path: path.resolve('dist'),
    publicPath: '/',
    filename: 'gfsdk.js',
    libraryTarget: 'umd',
    library: 'GamifiveSDK',
  },
  module: {
    noParse: /node_modules\/localforage\/dist\/localforage.js/,
    rules: [
        babelLoader,
        {
          test: /\.css$/,
          exclude: /(bower_components|node_modules)/,
          use:[
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
  plugins: [],
    // module end
  resolve: {
    extensions: ['.js', '.es6', '.jsx'],
  }
};

module.exports = devConfiguration;
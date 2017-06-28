// you can use this file to add your custom webpack plugins, loaders and anything you like.
// This is just the basic way to add additional webpack configurations.
// For more information refer the docs: https://storybook.js.org/configurations/custom-webpack-config

// IMPORTANT
// When you add this file, we won't add the default configurations which is similar
// to "React Create App". This only has babel loader to load JavaScript.

let cssLoader = {
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
}

module.exports = {
  plugins: [
    // your custom plugins
  ],
  module: {
    rules: [
      // add your custom loaders.
      cssLoader
    ],
  },
};

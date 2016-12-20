var path = require("path");
var webpack = require('webpack');
var devConfiguration = {
    entry:["./src/index.js"],
    output:{
        path: path.resolve(__dirname, "www"),
        filename:"bundle.js",
        publicPath: "/"
    },    
    module:{
        loaders:[
            {test: /\.js$/, exclude: /node_modules/, loader: 'babel-loader', query: {presets: ['react', 'es2015']}},
            {test:/\.css$/, exclude:/node_modules/, loader:"style-loader!css-loader?modules&localIdentName=[path][name]__[local]!postcss"},
            {test:/\.less$/, exclude:/node_modules/, loader:"style-loader!auto-prefixer!css-loader!less-loader"},
            {test:/\.sass$/, exclude:/node_modules/, loader:"style-loader!auto-prefixer!css-loader!stylus-loader"},
            {
                test:/\.(png|jpe?g|gif|svg|woff|woff2|ttf|eot|ico)$/, 
                exclude:/node_modules/,
                loader:'url-loader',
                query:{limit:1024}
            } 
        ]
    },
    devServer: {
        contentBase:"www/"
    },
    plugins:[
        new webpack.DefinePlugin({
                'process.env':{
                    'NODE_ENV': JSON.stringify('development')
                }
            })
    ],
    // module end
    resolve:{
        extensions:['','.js', '.es6','.jsx'],
    }
}

module.exports = devConfiguration;
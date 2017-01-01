var path = require("path");
var devConfiguration = {
    entry:["./src/index.js"],
    output:{
        path: path.resolve(__dirname, "dist"),
        filename: "gfsdk.js",
        libraryTarget: 'umd',
        library: 'GamifiveSDK',
    },   
    module:{
        loaders:[
            {test: /\.js$/, exclude: /(bower_components|node_modules)/, loader: 'babel-loader'},
            {test:/\.css$/, exclude:/(bower_components|node_modules)/, loader:"style-loader!css-loader?modules&importLoaders=1&localIdentName=[name]__[local]___[hash:base64:5]!postcss-loader"},
            {
                test:/\.(png|jpe?g|gif|svg|woff|woff2|ttf|eot|ico)$/, 
                exclude:/node_modules/,
                loader:'url-loader',
                query:{ limit:1024 }
            } 
        ]
    },
    plugins:[],
    // module end
    resolve:{
        extensions:['','.js', '.es6','.jsx'],
    }
}

module.exports = devConfiguration;
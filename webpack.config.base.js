var path = require("path");
var devConfiguration = {
    entry:["./src/index.js"],
    output:{
        path: path.resolve(__dirname, "dist"),
        publicPath: "/",
        filename: "gfsdk.js",
        libraryTarget: 'umd',
        library: 'GamifiveSDK',
    },   
    module:{
        noParse: /node_modules\/localforage\/dist\/localforage.js/,
        loaders:[
            { test: /\.js$/, exclude: /(bower_components|node_modules)/, loader: 'babel-loader' },
            { test:/\.css$/, exclude:/(bower_components|node_modules)/, loader: 'style-loader!css-loader?modules=true&importLoaders=1&localIdentName=[name]_[local]_[hash:base64:5]!postcss-loader' },
/*            {
                test:/\.(png|jpe?g|gif|svg|woff|woff2|ttf|eot|ico)$/, 
                exclude:/node_modules/,
                loader:'url-loader',
                query:{ limit:1024 }
            },*/
            {
                test:/\.(png|jpe?g|gif|svg|woff|woff2|ttf|eot|ico)$/,
                exclude:/node_modules/,
                loader: 'file-loader?name=assets/[name].[ext]'
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
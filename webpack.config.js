var path = require("path");
var devConfiguration = {
    entry:["./src/index.js"],
    output:{
        path: path.resolve(__dirname, "www", "js"),
        filename:"bundle.js",
        publicPath: "/js/"
    },    
    module:{
        loaders:[
            {test: /\.js$/, exclude: /node_modules/, loader: 'babel-loader', query: {presets: ['react', 'es2015']}},
            {test:/\.css$/, exclude:/node_modules/, loader:"style-loader!css-loader"},
            {test:/\.less$/, exclude:/node_modules/, loader:"style-loader!auto-prefixer!css-loader!less-loader"},
            {test:/\.sass$/, exclude:/node_modules/, loader:"style-loader!auto-prefixer!css-loader!stylus-loader"},
            {test:/\.es6$/, exclude:/node_modules/,loader:'babel-loader'},
            {test:/\.(png|jpg|ttf|eot)$/, exclude:/node_modules/,loader:'url-loader?limit=1024'} //kb
        ]
    },
    // module end
    resolve:{
        extensions:['','.js', '.es6','.jsx'],
    }
}

module.exports = devConfiguration;
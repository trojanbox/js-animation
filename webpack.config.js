/**
 * Created by wwwju on 2016/1/22.
 */
var path = require("path");
var webpack = require('webpack');
var commonsPlugin = new webpack.optimize.CommonsChunkPlugin('common.js');
var debug = true;

module.exports = {
    resolve: {
        root: [path.join(__dirname, 'src'), path.join(__dirname, 'node_modules')],
        alias: {},
        extensions: ['', '.js', '.css', '.scss', '.ejs', '.png', '.jpg']
    },
    entry: {
        index: path.join(__dirname, 'src/index.js')
    },
    output: {
        path: path.join(__dirname, 'build'),
        publicPath: "./out/",
        chunkFilename: debug ? '[chunkhash:8].chunk.js' : 'js/[chunkhash:8].chunk.min.js',
        filename: debug ? '[name].js' : '[chunkhash:8].[name].js'
    },
    module: {
        loaders: [
            {
                test: /\.(jpe?g|png|gif|svg)$/i,
                loaders: [
                    'image?{bypassOnDebug: true, progressive:true, optimizationLevel: 3, pngquant:{quality: "65-80"}}',
                    'url?limit=10000&name=img/[hash:8].[name].[ext]'
                ]
            },
            {
                test: /\.(woff|eot|ttf)$/i,
                loader: 'url?limit=10000&name=fonts/[hash:8].[name].[ext]'
            },
            {
                test: /\.js$/,
                loader: "babel"
            },
            {
                test: /\.css$/,
                loader: "style!css"
            },
            {
                test: /\.(jpg|png)$/,
                loader: "url?limit=8192"
            },
            {
                test: /\.scss$/,
                loader: "style!css!sass"
            }
        ]
    },
    plugins: [commonsPlugin]
};
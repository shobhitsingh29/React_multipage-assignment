const Merge = require('webpack-merge');
const CommonConfig = require('./webpack.common.config');
const webpack = require('webpack');
const path = require("path");


module.exports = Merge(CommonConfig, {
    devtool: "inline-source-map",
    entry:  path.resolve(__dirname, "src/js/main.js")
,
    output: {
        path: path.resolve(__dirname, "./dist"),
        filename: "bundle.js",
        publicPath: "/"
    },
    module: {
        loaders: [ ]
    }, plugins: [
        new webpack.DefinePlugin({
            'process.env': {
                'NODE_ENV': JSON.stringify('dev')
            }
        })
    ]
});
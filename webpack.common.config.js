const path = require('path');
const webpack = require('webpack');
module.exports = {
    entry: [
        path.resolve(__dirname, "./src/js/main.js")
    ],
    output: {
        path: path.resolve(__dirname, "./dist"),
        filename: "bundle.js",
        publicPath: "/"
    },
    resolve: {
        extensions: ['.js', '.jsx', '.json']
    },
    devServer: {
        port: 8080,
        hot: false,
        publicPath: "/",
        historyApiFallback: true
    },
    plugins: [ new webpack.HotModuleReplacementPlugin({
        multiStep: false
    }),
        new webpack.NamedModulesPlugin()],
    module: {
        loaders: [
            {
                enforce: 'pre',
                test: /\.js$/,
                loader: 'eslint-loader',
                exclude: /(node_modules)/
            },
            {
                test: /\.js$/,
                loader: "babel-loader",
                exclude: /node_modules/
            }, {
                test: /\.css$/,
                loaders: [{
                    loader: "style-loader"
                },
                    {
                        loader: "css-loader"
                    }]
            }
        ]
    }
}
const path = require("path");
let  webpack = require('webpack');
module.exports = {
    devtool: "inline-source-map",
    entry: [
        path.resolve(__dirname, "src/js/main.js")
    ],
    output: {
        path: path.resolve(__dirname, "./dist"),
        filename: "bundle.js",
        publicPath: "/"
    },
    resolve: {
        extensions: ['.js', '.jsx', '.json']
    },
    plugins: [new webpack.HotModuleReplacementPlugin({
        multiStep: false
    }), new webpack.NamedModulesPlugin()],
    module: {
        loaders: [
            {
                enforce: 'pre',
                test: /\.js$/,
                loader: 'eslint-loader',
                options: {
                    fix: true
                },
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
};
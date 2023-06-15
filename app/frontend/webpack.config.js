const path = require('path')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const ESLintWebpackPlugin = require('eslint-webpack-plugin')

module.exports = {
    entry: path.join(__dirname, 'src', 'index.tsx'),
    resolve: {
        extensions: ['.tsx', '.ts', '.js', '.jsx'],
        alias: {
            src: path.resolve(__dirname, 'src'),
        },
    },
    performance: {
        hints: false,
    },
    module: {
        rules: [
            {
                test: /\.(js|jsx|tsx)$/,
                exclude: /node_modules/,
                use: ['babel-loader'],
            },
            {
                test: /\.(js|ts|tsx)$/,
                exclude: /node_modules/,
                use: ['ts-loader'],
            },
            {
                test: /\.(css|scss)$/,
                use: ['style-loader', 'css-loader'],
            },
            {
                test: /\.(jpg|jpeg|png|gif|mp3|svg|woff|ttf|eot)$/,
                loader: 'file-loader',
                
            },
        ],
    },
    output: {
        path: path.join(__dirname, 'build'),
        filename: '[name].[contenthash].js',
        sourceMapFilename: '[name].[contenthash].js.map',
        publicPath: '',
    },
    plugins: [
        new CleanWebpackPlugin(),
        new HtmlWebpackPlugin({
            template: path.join(__dirname, 'public', 'index.html'),
            favicon: path.join(__dirname, 'public', 'favicon.ico'),
        }),
        new ESLintWebpackPlugin(),
    ],
}

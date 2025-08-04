const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');

module.exports = (env, argv) => {
    const isProduction = argv.mode === 'production';

    return {
        mode: isProduction ? 'production' : 'development',
        entry: './src/index.js',
        output: {
            filename: 'bundle.js',
            path: path.resolve(__dirname, 'dist'),
            publicPath: isProduction ? './' : '/', 
        },
        devtool: isProduction ? 'source-map' : 'eval-source-map',
        devServer: {
            static: {
                directory: path.join(__dirname, 'dist'),
            },
            compress: true,
            port: 9000,
            open: true,
            hot: true,
        },
        module: {
            rules: [
                {
                    test: /\.js$/,
                    exclude: /node_modules/,
                    use: {
                        loader: 'babel-loader',
                        options: {
                            presets: ['@babel/preset-env'],
                        },
                    },
                },
                {
                    test: /\.css$/,
                    use: [
                        isProduction ? MiniCssExtractPlugin.loader : 'style-loader',
                        'css-loader',
                    ],
                },
                {
                    test: /\.(png|svg|jpg|jpeg|gif)$/i,
                    type: 'asset/resource',
                    generator: {
                        filename: 'assets/images/[name][ext]', 
                    },
                },
            ],
        },
        plugins: [
            new CleanWebpackPlugin(), 
            new HtmlWebpackPlugin({
                template: './src/index.html', 
                filename: 'index.html',
                minify: isProduction ? {
                    removeComments: true,
                    collapseWhitespace: true,
                    removeAttributeQuotes: true,
                } : false,
            }),
            isProduction && new MiniCssExtractPlugin({
                filename: 'styles/[name].[contenthash].css',
            }),
        ].filter(Boolean), 
    };
};
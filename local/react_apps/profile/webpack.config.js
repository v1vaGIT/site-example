const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')

let mode = 'development'
let target = 'web'
if (process.env.NODE_ENV === 'production') {
    mode = 'production'
    target = 'browserslist'
}

const plugins = [
    new HtmlWebpackPlugin(),
    new MiniCssExtractPlugin(),
]

module.exports = {
    mode,
    target,
    plugins,
    entry: './src/index.js',
    devtool: 'source-map',
    output: {
        path: path.resolve(__dirname, 'dist'),
        assetModuleFilename: 'assets/[name].[ext]',
        filename: 'index_bundle.js',
        publicPath: '/local/react_apps/profile/dist/',
        clean: true
    },
    devServer: {
        hot: true,
    },
    resolve: {
        extensions: ['.js', '.jsx'],
    },
    module: {
        rules: [
            {
                test: /\.(js|jsx)$/i,
                exclude: /node_modules/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: [
                            '@babel/preset-env',
                            '@babel/preset-react',
                        ],
                    },
                },
            },
            { test: /\.png/, type: 'asset/resource' },
            { test: /\.svg/, type: 'asset/inline' },
            // {
            //     test: /\.module\.(s[ac]|c)ss$/i,
            //     use: [
            //         MiniCssExtractPlugin.loader,
            //         {
            //             loader: 'css-loader',
            //             options: {
            //                 importLoaders: 1,
            //                 modules: {
            //                     localIdentName: '[local]__[hash:base64:5]',
            //                 },
            //             }
            //         },
            //         'sass-loader',
            //     ],
            // },
            {
                test: /\.(s[ac]|c)ss$/i,
                use: [
                    MiniCssExtractPlugin.loader,
                    {
                        loader: 'css-loader',
                        options: {
                            importLoaders: 1,
                            modules: {
                                localIdentName:'[local]__[hash:base64:5]',
                            },
                        }
                    },
                    'sass-loader',
                ],
            },
        ]
    },
}
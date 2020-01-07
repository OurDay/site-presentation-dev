const path = require('path')
const webpack = require('webpack')
const HtmlWebPackPlugin = require('html-webpack-plugin')
const UglifyJsPlugin = require('uglifyjs-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const ModernizrWebpackPlugin = require('modernizr-webpack-plugin');
const dotenv = require('dotenv').config({path: __dirname + '/.env'})

module.exports = {
    entry: {
        styles: './src/scss/main.scss',
        main: './src/index.js'
    },
    output: {
        path: path.resolve(__dirname, 'dist'),
        //publicPath: '/',
        filename: '[name].js'
    },
    mode: 'development',
    target: 'web',
    // devtool: '#source-map',
    devtool: '#source-map',
    module: {
        rules: [
            {
                test: /\.tsx?$/,
                use: 'ts-loader',
                exclude: /node_modules/,
            },
            {
                enforce: "pre",
                test: /\.js$/,
                exclude: /node_modules/,
                loader: "eslint-loader",
                options: {
                    emitWarning: true,
                    failOnError: false,
                    failOnWarning: false
                }
            },
            {
                test: /\.js$/,
                exclude: /node_modules/,
                loader: "babel-loader",
            },
            {
                // Loads the javacript into html template provided.
                // Entry point is set below in HtmlWebPackPlugin in Plugins
                test: /\.html$/,
                use: [
                    {
                        loader: "html-loader",
                        //options: { minimize: true }
                    }
                ]
            },
            {
                test: /\.css$/,
                use: ['style-loader', 'css-loader']
            },
            {
                test: /\.(sa|sc|c)ss$/,
                use: [
                    {
                        loader: MiniCssExtractPlugin.loader,
                        options: {
                            hmr: false,
                            minimize: true
                        },
                    },
                    'css-loader',
                    'postcss-loader',
                    'sass-loader',
                ],
            },
            {
                test: /\.(png|svg|jpe?g|gif)$/,
                use: [
                    {
                        loader: "file-loader",
                        options: {
                            // name: '[name].[contenthash].[ext]',
                            name: '[name].[ext]',
                            outputPath: 'img/',
                            publicPath: 'img/',
                            postTransformPublicPath: (p) => `__webpack_public_path__ + ${p}`
                        }
                    }
                ]
            },
            {
                test: /\.(woff|woff2|eot|ttf|otf)$/,
                use: [
                    {
                        loader: "file-loader",
                        options: {
                            // name: '[name].[contenthash].[ext]',
                            name: '[name].[ext]',
                            outputPath: 'fonts/',
                            publicPath: 'fonts/',
                            postTransformPublicPath: (p) => `__webpack_public_path__ + ${p}`
                        }
                    }
                ]
            },

            {
                test: /\.jsx?$/,
                exclude: /(node_modules|bower_components|public\/)/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: ['@babel/preset-env'],
                        plugins: [
                            ["@babel/plugin-transform-runtime",
                                {
                                    "absoluteRuntime": false,
                                    "corejs": false,
                                    "helpers": true,
                                    "regenerator": true,
                                    "useESModules": false
                                }
                            ],
                            ["@babel/plugin-transform-modules-umd", {
                                "globals": {
                                    "es6-promise": "Promise"
                                }
                            }]
                        ]
                    }
                }
            },
            /* {
                test: /\.(png|svg|jpg|gif)$/,
                use: ['file-loader']
            } */
        ]
    },
    resolve: {
        extensions: [ '.tsx', '.ts', '.js' ],
    },
    optimization: {
        namedModules: false,
        namedChunks: false,
        nodeEnv: 'development',
        flagIncludedChunks: true,
        occurrenceOrder: true,
        sideEffects: true,
        usedExports: true,
        concatenateModules: true,
        moduleIds: 'hashed',
        runtimeChunk: 'single',
        splitChunks: {
            cacheGroups: {
                vendor: {
                    test: /[\\/]node_modules[\\/]/,
                    name: 'vendors',
                    chunks: 'all'
                }
            }
        },
        minimize: true,
        minimizer: [
            new UglifyJsPlugin({
                test: /\.js(\?.*)?$/i,
                cache: true,
                parallel: true,
                extractComments: true
            })
        ],
    },
    plugins: [
        new webpack.HotModuleReplacementPlugin(),
        // new webpack.NoEmitOnErrorsPlugin(),
        new webpack.ProvidePlugin({
            "process.env": dotenv.parsed,
        }),
        new MiniCssExtractPlugin({
            // Options similar to the same options in webpackOptions.output
            // both options are optional
            filename: '[name].css',
            chunkFilename: '[id].css'
        }),
        new webpack.EnvironmentPlugin({...process.env}),
        new HtmlWebPackPlugin({
            template: "./src/html/index.html",
            filename: "./index.html",
            excludeChunks: ['server'],
            title: process.env.APP_NAME || 'OurDay',
            minify: true,
            cache: true,
            meta: {
                viewport: 'width=device-width, initial-scale=1, shrink-to-fit=no'
            },
            chunksSortMode: 'dependency',
            xhtml: true,
            hash: true,
        }),
        new ModernizrWebpackPlugin({
            htmlWebpackPlugin: true,
            minify: {
                output: {
                    comments: true,
                    beautify: false,
                }
            }
        })
    ]
}


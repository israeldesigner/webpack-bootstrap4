const modeEnv = process.env.NODE_ENV !== 'production'
const webpack = require('webpack');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const TerserPlugin = require("terser-webpack-plugin");
const HtmlWebpackPlugin = require('html-webpack-plugin');
const  CopyPlugin  =  require ( "copy-webpack-plugin" ) ;
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const path = require('path');
// const NunjucksWebpackPlugin  = require('nunjucks-webpack-plugin');


module.exports = {
    mode: modeEnv ? 'development' : 'production',
    entry: path.join(__dirname, './src/bundle.js'),
    output: {
        filename: 'bundle.js',
        // path: path.join(__dirname, 'app'),
        path: path.resolve('app/static/assets')
    },
    watch: true,
    devtool: 'source-map',
    devServer: {
        historyApiFallback: true,
        open: true,
        compress: true,
        hot: true,
        port: 3000,
        allowedHosts: [
            'all',
        ],
        client: {
            progress: true,
        },
    },
    optimization: {
        minimize: true,
        minimizer: [
          new TerserPlugin({
            test: /\.js(\?.*)?$/i,
            extractComments: false,
            terserOptions: {
              ecma: undefined,
              parse: {},
              compress: {
                drop_console: false
              },
              format: {
                comments: false,
              },
              mangle: true
            },
          }),
        ],
      },
    plugins: [
        new CleanWebpackPlugin(),
        new MiniCssExtractPlugin({
            filename: "style.css",
        }),
        new CopyPlugin({
            patterns: [
              { from: "src/assets/img", to: "img" }
            ],
        }),
        new HtmlWebpackPlugin({
            inject: false,
            title: 'Inject WebPack',
            hash: false,
            template: 'src/index.html',
            minify: false
        })
    ],
    module:{
        rules:[
            {
                test: /\.s?[ac]ss$/,
                use: [{
                    loader: MiniCssExtractPlugin.loader,
                }, {
                    loader: "css-loader",
                     options: {
                        sourceMap: true,
                    }
                }, {
                    loader: "sass-loader",
                    options: {
                        sourceMap: true
                    }
                }]
            },
            {
                test: /\.(woff(2)?|ttf|eot|svg)/,
                use: [
                  {
                    loader: 'file-loader',
                    options: {
                      outputPath: 'fonts/'
                    }
                  }
                ]
            }
        ]
    }
}

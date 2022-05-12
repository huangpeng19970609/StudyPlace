<<<<<<< HEAD
/*
 * @Author: 黄鹏
 * @LastEditors: 黄鹏
 * @LastEditTime: 2021-10-26 19:10:32
 */
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
module.exports = {
  entry: './src/index.js',
  mode: 'development',
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, "./build")
  },
  devServer: {
    static: path.join(__dirname, 'build'),
    compress: true,
    port: 9000
  },
  module: {
    rules: [
      {
        test: /\.m?ts$/,
        exclude: /(node_modules|bower_components)/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-typescript']
          },
        }
      }
    ],
  },
  plugins: [
    new HtmlWebpackPlugin(
      {
        template: "./public/index.html"
      }
    ),
  ]
=======
/*
 * @Author: 黄鹏
 * @LastEditors: 黄鹏
 * @LastEditTime: 2021-10-26 19:10:32
 */
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
module.exports = {
  entry: './src/index.js',
  mode: 'development',
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, "./build")
  },
  devServer: {
    static: path.join(__dirname, 'build'),
    compress: true,
    port: 9000
  },
  module: {
    rules: [
      {
        test: /\.m?ts$/,
        exclude: /(node_modules|bower_components)/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-typescript']
          },
        }
      }
    ],
  },
  plugins: [
    new HtmlWebpackPlugin(
      {
        template: "./public/index.html"
      }
    ),
  ]
>>>>>>> 2f9b1cf7b276e51ea5a21d2c3ad9205851816ab6
}
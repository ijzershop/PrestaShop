var webpack = require('webpack');
const path = require('path');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

var plugins = [
  new MiniCssExtractPlugin({
        filename: 'theme-core-bundled.css',
      })
];


module.exports = [{
  mode: 'development',
  // JavaScript
  entry: [
    './assets/js/theme-core.js'
  ],
  output: {
    path: path.resolve(__dirname, 'assets/js'),
    filename: 'theme.js'
  },
  externals: {
    prestashop: 'prestashop'
  },
  plugins: plugins,
  resolve: {
    extensions: ['.js']
  }
}, {
  mode: 'development',
  // CSS
  entry: [
    './assets/css/theme-core.scss'
  ],
  output: {
    path: path.resolve(__dirname, 'assets/css'),
    filename: 'theme.css'
  },
  module: {
rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader"
        }
      },
      {
        test: /\.scss$/,
        use: [
          "style-loader",
          MiniCssExtractPlugin.loader,
          "css-loader",
          "sass-loader"
        ]
      }
    ]  },
  plugins: plugins,
  resolve: {
    extensions: ['.scss', '.styl', '.less', '.css']
  }
}];
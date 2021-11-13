const webpack = require('webpack');
const path = require('path');
const { VueLoaderPlugin } = require('vue-loader');

module.exports = {
  entry: './src/index.js',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'bundle.js',
  },
  module: {
    rules: [
      {
        test: /\.vue$/,
        loader: 'vue-loader',
      },
      {
        test: /\.js$/,
        loader: 'babel-loader',
      },
    ],
  },
  resolve: {
    extensions: [
      '.js',
      '.vue',
    ],
  },
  plugins: [
    new VueLoaderPlugin(),
  ],
};

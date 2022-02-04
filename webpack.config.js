/* eslint-disable */
const webpack = require('webpack');
const path = require('path');

module.exports = {
  entry: './src/extension/contentSrc.js',
  output: {
    filename: 'content.js',
    path: path.resolve(__dirname, './src/extension'),
  },
};
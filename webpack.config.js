/* eslint-disable */
const webpack = require('webpack');
const path = require('path');

module.exports = {
  entry: './src/extension/content.js',
  output: {
    filename: 'content.js',
    path: path.resolve(__dirname, 'extensionBuild'),
  },
};

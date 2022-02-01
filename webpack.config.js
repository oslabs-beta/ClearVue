/* eslint-disable */
const webpack = require('webpack');
const path = require('path');

module.exports = {
  entry: './content.js',
  output: {
    filename: 'content.js',
    path: path.resolve(__dirname, 'extensionBuild'),
  },
};

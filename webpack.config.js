var fs = require('fs');
var webpack = require('webpack');

module.exports = {
  entry: {
    loader: './src/loader.js',
    script: './src/script.js'
  },
  output: {
    path: 'dist',
    filename: '[name].js'
  },
  module: {
    loaders: [{
      test: /\.js?$/,
      loader: 'babel-loader',
      exclude: function (path) {
        return (!!path.match(/node_modules/));
      },
      query: {
        presets: ['es2015']
      }
    }]
  }
};

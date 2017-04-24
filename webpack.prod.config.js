var path = require('path');
var webpack = require('webpack');
var webpackUMDExternal = require('webpack-umd-external');

module.exports = {
  devtool: 'sourcemap',
  entry: {
    index: './src/Expandable/index.js'
  },
  output: {
    path: path.join(__dirname, 'dist'),
    publicPath: 'dist/',
    filename: 'react-expandable.js',
    sourceMapFilename: 'react-expandable.map',
    library: 'ReactExpandable',
    libraryTarget: 'umd'
  },
  plugins: [
    new webpack.optimize.UglifyJsPlugin({
      compress: { warnings: false },
      output: { comments: false }
    })
  ],
  module: {
    loaders: [{
      test: /\.js$/,
      exclude: /node_modules/,
      loader: 'babel-loader'
    }]
  },
  externals: webpackUMDExternal({
    'react': 'React',
    'react-waypoint': 'ReactWaypoint',
    'react-motion': 'ReactMotion',
    'react-measure': 'ReactMeasure',
    'styled-components': 'ReactStyled',
  }),
};

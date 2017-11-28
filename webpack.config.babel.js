// import developmentConf from './config/webpack.development'
// import path from 'path'
// import webpack from 'webpack'
// import merge from 'webpack-merge'
// import HtmlWebpackPlugin from 'html-webpack-plugin'
// import FaviconsWebpackPlugin from 'favicons-webpack-plugin'

// import parts from './config/webpack.parts'

const path = require('path');
const webpack = require('webpack');
const merge = require('webpack-merge');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const FaviconsWebpackPlugin = require('favicons-webpack-plugin');

const parts = require('./config/webpack.parts');

const developmentConfig = require('./config/webpack.development');
const productionConfig = require('./config/webpack.production');
const commonConfigure = require('./config/webpack.common');

const PATHS = {
  app: path.join(__dirname, 'app'),
  build: path.join(__dirname, 'build'),
};

const commonConfig = merge([
  commonConfigure,
  {
    entry: {
      app: PATHS.app
    },
    output: {
      path: PATHS.build,
      filename: '[name].js',
    },
  },
  parts.lintJavaScript({ include: PATHS.app }),
])



module.exports = (env) => {
  console.log('\x1b[31m%s\x1b[0m%s', 'env => ', env);
  if (env === 'production') {
    return merge(commonConfig, productionConfig);
  }
  return merge(commonConfig, developmentConfig);
};

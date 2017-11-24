// import developmentConf from './config/webpack.development'
// import path from 'path'
// import webpack from 'webpack'
// import merge from 'webpack-merge'
// import HtmlWebpackPlugin from 'html-webpack-plugin'
// import FaviconsWebpackPlugin from 'favicons-webpack-plugin'

// import parts from './config/webpack.parts'

const developmentConf = require('./config/webpack.development')
const path = require('path');
const webpack = require('webpack')
const merge = require('webpack-merge')
const HtmlWebpackPlugin = require('html-webpack-plugin');
const FaviconsWebpackPlugin = require('favicons-webpack-plugin');

const parts = require('./config/webpack.parts')

const PATHS = {
  app: path.join(__dirname, 'app'),
  build: path.join(__dirname, 'build'),
};

// const commonConfig = {
//   entry: {
//     app: PATHS.app,
//   },
//   output: {
//     path: PATHS.build,
//     filename: '[name].js',
//   },
//   devServer: {
//     port: 9000,
//   },
//   plugins: [
//     new HtmlWebpackPlugin({
//       title: 'webpack bundle from cli',
//     }),
//     new FaviconsWebpackPlugin({
//       logo: './favicon.png',
//       prefix: 'icons-[hash]/',
//       statsFilename: 'iconstats-[hash].json',
//       icons: {
//         android: true,
//         appleIcon: true,
//         appleStartup: true,
//         coast: false,
//         favicons: true,
//         firefox: true,
//         opengraph: false,
//         twitter: false,
//         yandex: false,
//         windows: false,
//       },
//     }),
//     new webpack.LoaderOptionsPlugin({
//       options: {
//         eslint: {
//           // Fail only on errors
//           failOnWarning: false,
//           failOnError: true,

//           // Toggle autofix
//           fix: false,

//           // Output to Jenkins compatible XML
//           outputReport: {
//             filePath: 'checkstyle.xml',
//             formatter: require('eslint/lib/formatters/checkstyle'),
//           },
//         }
//       }
//     })
//   ],
// };

const commonConfig = merge([
  {
    entry: {
      app: PATHS.app,
    },
    output: {
      path: PATHS.build,
      filename: '[name].js',
    },
    devServer: {
      port: 9000,
    },
    plugins: [
      new HtmlWebpackPlugin({
        title: 'webpack bundle from cli',
      }),
    ],
  },
  parts.lintJavaScript({include: PATHS.app}),
  parts.loadCSS(),
  parts.babelConfig({
    include: path.resolve('app'),
    options: {
      babelrc: false,
      presets: [["env", {modules: false}]]
    }
  })
])

// const developmentConf = merge([
//   {
//     devServer: {
//       watchOptions: {
//         aggregateTimeout: 300, //第一次变化后延迟打包时间
//         poll: 1000, //每次轮询间隔时长，单位ms，接受布尔值
//       },
//     },
//     plugins: [
//       new webpack.WatchIgnorePlugin([
//         path.join(__dirname, 'node_modules'),
//       ]),
//     ],
//   },
// ]);

// const productionConf = () => commonConfig;
const productionConf = merge([
])

// const developmentConf = () => {
//   const config = {
    
//   };
//   return Object.assign(
//     {},
//     commonConfig,
//     config
//   );
// };


module.exports = (env) => {
  console.log('env0000000', env);
  if (env === 'production') {
    return merge(commonConfig, productionConf);
  }
  // return developmentConf();
  return merge(commonConfig, developmentConf);
};
// exports.commonConfig = ({entry, output}) => ({
//   entry,
//   output,
// })

const path = require('path');

const merge = require('webpack-merge');
const HtmlWebpackPlugin = require('html-webpack-plugin');

const parts = require('./webpack.parts');

module.exports = merge([
  {
    devServer: {
      port: 9000,
    },
    plugins: [
      new HtmlWebpackPlugin({
        title: 'webpack bundle from cli',
      }),
    ],
  },
  // parts.loadCSS(),
  parts.babelConfig({
    include: path.resolve( './app'),
    options: {
    },
  }),
]);

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
// 
// 
// 
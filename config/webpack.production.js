// import parts from "./webpack.parts"
const parts = require('./webpack.parts');

const webpack = require('webpack');
const merge = require('webpack-merge');
const glob = require('glob');
const path = require('path')


// console.log('\x1b[32m%s\x1b[0m%s', 'cwd: ', process.cwd());
// const baseDir = process.cwd();
const isVendor = ({resource}) => /node_modules/.test(resource)


module.exports = merge([
  {
    entry: {
      vendor: ["react"],
      header: "./app/header/index.js",
      footer: "./app/footer/index.js",
      main: "./app/main/index.js",
    },
    output: {
      path: path.join(process.cwd(), "build"),
      filename: "[name].js"
    }
  },
  parts.extractBundles([
    {
      name: 'header',
      chunks: ['header'],
      minChunks: isVendor,
    },
    {
      name: 'footer',
      chunks: ['footer'],
      minChunks: isVendor,
    },
    {
      name: 'main',
      chunks: ['main'],
      minChunks: isVendor,
    },
    {
      name: 'vendor',
      chunks: ['footer', 'header', 'main'],
      minChunks: (module, count) => isVendor(module) && count >= 2,
    },
  ]),
  parts.extractCSS({
    use: ['css-loader', 'sass-loader', parts.autoprefix()],
  }),
  // parts.purifyCSS({
  //   paths: glob.sync(`${baseDir}/build/**/*.js`, { nodir: true }),
  // }),
  parts.loadImage({
    options: {
      limit: 15000,
      name: '[name].[ext]',
    },
  }),
  parts.generateSourceMaps({ 
    // type: "source-map"
    type: "hidden-source-map"
  }),
]);
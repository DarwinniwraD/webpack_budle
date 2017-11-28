// import parts from "./webpack.parts"
const parts = require('./webpack.parts');

const merge = require('webpack-merge');
const glob = require('glob');


// console.log('\x1b[32m%s\x1b[0m%s', 'cwd: ', process.cwd());
// const baseDir = process.cwd();

module.exports = merge([
  parts.extractCSS({
    use: ['css-loader', 'sass-loader', parts.autoprefix()],
  }),
  // parts.purifyCSS({
  //   paths: glob.sync(`${baseDir}/build/**/*.js`, { nodir: true }),
  // }),
]);
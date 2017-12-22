const path = require('path');
const merge = require('webpack-merge');

const parts = require('./webpack.parts');

module.exports = merge([
  parts.devServer(),
  parts.page({
    title: 'Mocha demo',
    entry: {
      spec: path.join(process.cwd(), 'spec'),
    },
  }),
]);
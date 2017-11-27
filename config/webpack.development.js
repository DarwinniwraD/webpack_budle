// import parts from './config/webpack.parts'

const parts = require('./webpack.parts')
const merge = require('webpack-merge')

module.exports = merge([
  {
    devtool: 'inline-source-map',
  },
  parts.devServer({
    host: process.env.HOST,
    port: process.env.PORT,
  }),
])
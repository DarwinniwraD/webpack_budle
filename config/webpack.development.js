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
  parts.loadCSS()
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
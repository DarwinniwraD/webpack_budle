// import parts from './config/webpack.parts'

const parts = require('./webpack.parts')
const merge = require('webpack-merge')


// export developmentConfig = () => {
//   const config ={
//     devServer
//   }
// }

exports.developmentConf = merge([
  parts.devServer({
    host: process.env.HOST,
    port: process.env.PORT,
  }),
])

// export default merge([
//   parts.devServer({
//     host: process.env.HOST,
//     port: process.env.PORT,
//   }),
// ])
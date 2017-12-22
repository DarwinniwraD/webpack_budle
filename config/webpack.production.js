// import parts from "./webpack.parts"
const parts = require('./webpack.parts');

const webpack = require('webpack');
const merge = require('webpack-merge');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const UglifyJSPlugin = require('uglifyjs-webpack-plugin');

const glob = require('glob');
const path = require('path')


// console.log('\x1b[32m%s\x1b[0m%s', 'cwd: ', process.cwd());
// const baseDir = process.cwd();
const isVendor = ({resource}) => /node_modules/.test(resource)


module.exports = merge([
  {
    entry: {
      vendor: ["react"],
      header: "./app/header",
      // footer: "./app/footer/index.js",
      main: "./app/main",
      // globals: "./app/globals",
    },
    module: {
      rules: [
        {
          test: process.cwd()+'/app/local.js',
          use: 'imports-loader?this=>window'
        },
        {
          test: process.cwd()+'/app/globals.js',
          use: 'exports-loader?file,parse=helpers.parse'
        }
      ]
    },
    plugins: [
      new CleanWebpackPlugin([process.cwd() + '/build/']),
      new UglifyJSPlugin(),
      new webpack.HashedModuleIdsPlugin(),
      // new webpack.NamedModulesPlugin(),  //此法同上
      new webpack.ProvidePlugin({
        // _: 'lodash'
        join: ['lodash', 'join']
      })
    ],
    output: {
      filename: "[name].[chunkhash:8].js",
      chunkFilename: "[name].[chunkhash:8].js",
      path: path.join(process.cwd(), "build/")
    },
    performance: {
      hints: "warning", // "error" or false are valid too
      maxEntrypointSize: 50000, // in bytes, default 250k
      maxAssetSize: 450000, // in bytes
    },
    recordsPath: path.join(process.cwd(), "records.json"),
  },
  // parts.clean(path.join(process.cwd(), "build/")),
  parts.extractBundles([
    /**
     * 
     * Note that order matters here. The 'vendor' instance of the 
     * CommonsChunkPlugin must be included prior to the 'manifest'
     * instance.
     *
     **/
    { 
      name: 'vendor',
      minChunks: Infinity, // (with more entries, this ensures that no other module goes into the vendor chunk)
    },
    {
      name: 'manifest',
      // minChunks: Infinity,
    },
    // {
    //   name: 'main',
    //   chunks: ['main'],
    //   minChunks: Infinity,
    // },
    {
      name: 'common',
      chunks: ['main', 'header'],
      minChunks: 2
      // minChunks: isVendor,
    },
    // {
    //   name: 'footer',
    //   chunks: ['footer'],
    //   minChunks: isVendor,
    // },
    // {
    //   name: 'common',
    //   chunks: ['main', 'header'],
    //   // minChunks:  (module, count) => isVendor(module) && count >= 2,
    //   minChunks:  function (module, count) {
    //     console.log(module);
    //     return isVendor(module) && count >= 1
    //     return module.resource
    //   }
    // },
  ]),
  parts.extractCSS({
    use: ['css-loader', 'sass-loader', parts.autoprefix()],
  }),
  parts.minifyCSS({
    options: {
      discardComments: {
        removeAll: true,
      },
      // Run cssnano in safe mode to avoid
      // potentially unsafe transformations.
      safe: true,
    }
  }),
  // parts.purifyCSS({
  //   paths: glob.sync(`${baseDir}/build/**/*.js`, { nodir: true }),
  // }),
  parts.loadImage({
    options: {
      limit: 15000,
      name: '[name].[hash:8].[ext]',
    },
  }),
  parts.minifyImage({
    pngquant: {
      quality: '20'
    }
  }),
  parts.setFreeVariable("process.env.NODE_ENV", "production"),
  parts.generateSourceMaps({ 
    // type: "source-map"
    type: "hidden-source-map"
  }),
]);
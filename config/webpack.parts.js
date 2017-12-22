const webpack = require('webpack');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const PurifyCSSPlugin = require('purifycss-webpack');
const SpritesmithPlugin = require('webpack-spritesmith');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const HtmlWebpackPlugin = require("html-webpack-plugin");

const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const CssNano = require('cssnano')

var ImageminPlugin = require('imagemin-webpack-plugin').default

const path = require('path');

exports.extractBundles = bundles => ({
  plugins: bundles.map(
    bundle => new webpack.optimize.CommonsChunkPlugin(bundle)
  ),
});

exports.clean = path => ({
  plugins: [new CleanWebpackPlugin([path])],
});

exports.minifyCSS = ({options}) => ({
  plugins: [
    new OptimizeCSSAssetsPlugin({
      cssProcessor: CssNano,
      cssProcessorOptions: options,
      canPrint: false,
    })
  ]
});

exports.minifyImage = ({options}) => ({
  plugins: [
    new ImageminPlugin({
      disable: process.env.NODE_ENV !== 'production',
      options,
    })
  ]
});

exports.setFreeVariable = (key, value) => { //定义环境变量
  const env = {};
  env[key] = JSON.stringify(value);

  return {
    plugins: [new webpack.DefinePlugin(env)],
  };
};

exports.page = (
  {
    path = "",
    template = require.resolve(
      "html-webpack-plugin/default_index.ejs"
    ),
    title,
    entry,
    chunks,
  } = {}
) => ({
  entry,
  plugins: [
    new HtmlWebpackPlugin({
      filename: `${path&&path + '/'}index.html`,
      template,
      title,
      chunks
    })
  ]
})

exports.devServer = ({ host, port } = {}) => ({
  devServer: {
    historyApiFallback: true,
    stats: 'errors-only',
    host, //默认到localhost
    port, //默认到8080
    overlay: {
      errors: true,
      warnings: true,
    },
    // 在老版本的win, ubuntu, vagrant, 和docker中webpack devserver的监测功能会失效，在这种情况下使用池化来监测文件变化
    watchOptions: {
      //重新打包延迟时间
      aggregateTimeout: 300,
      //池化与池化之间的时间间隔
      poll: 1000,
    },
  },
});

exports.lintJavaScript = ({ include, exclude, options }) => ({
  module: {
    rules: [{
      test: /\.js$/,
      include,
      exclude,
      enforce: 'pre',
      loader: 'eslint-loader',
      options,
    } ],
  },
});

exports.loadCSS = ({ include, exclude} = {}) => ({
  module: {
    rules: [
      //以下用于处理在css中引入sass,需要在此处理import bootstrap的问题
      {
        test: /\.css$/,
        include,
        exclude,
        use: [
          'style-loader',
          {
            loader: 'css-loader',
            options: {
              importLoaders: 1,
            },
          },
          'resolve-url-loader',
          {
            loader: 'px2rem-loader',
            options: {
              remUnit: 75,
              remPrecision: 5,
            },
          },
          'sass-loader',
        ],
      },
      // {
      //   test: /\.css$/,
      //   include,
      //   exclude,
      //   loaders: 'style-loader!css-loader?' + JSON.stringify({importLoaders: 1}) + 'importLoaders=1!px2rem-loader?' + JSON.stringify({remUnit:75, remPrecision:8}) + '!sass-loader'
      // }
      // {
      //   test: /\.png$/,
      //   loaders: ['file-loader?name=assets/sprite/[hash].[ext]'],
      // },
      // {
      //   test: /\.css$/,
      //   loader: 'sass-loader',
      // }
    ],
  },
  resolve: {
    modules: ['node_modules', 'spritesmith-generated'],
  },
  plugins: [
    new SpritesmithPlugin({
      src: {
        cwd: path.resolve(process.cwd(), 'app/assets/images'),
        glob: '*.png',
      },
      target: {
        image: path.resolve(process.cwd(), 'app/assets/sprite/sprite.png'),
        css: path.resolve(process.cwd(), 'app/assets/sprite/_sprite.scss'),
      },
      apiOptions: {
        cssImageRef: '~sprite.png',
      },
    }),
  ],
});

exports.extractCSS = ({include, exclude, use}) => {
  const plugin = new ExtractTextPlugin({
    allChunks: true,
    filename: '[name].[contenthash:8].css',
  });
  return {
    module: {
      rules: [{
        test: /\.css$/,
        include,
        exclude,
        use: plugin.extract({
          use,
          fallback: 'style-loader',
        }),
      }],
    },
    plugins: [plugin],
  };
};

exports.autoprefix = () => ({
  loader: 'postcss-loader',
  options: {
    plugins: () => [require('autoprefixer')()],
  },
});

exports.purifyCSS = ({path}) => ({
  plugins: [new PurifyCSSPlugin({path})],
});

//更多可选配置参看https://www.npmjs.com/package/url-loader
exports.loadImage = ({include, exclude, options} = {}) => ({
  module: {
    rules: [{
      test: /\.(png|jpg|svg)$/,
      include,
      exclude,
      use: {
        loader: 'url-loader',
        options,
      },
    }],
  },
});

exports.babelConfig = ({ include, options }) => ({
  module: {
    rules: [{
      test: /\.js$/,
      include,
      exclude: ['node_modules'],
      use: {
        loader: 'babel-loader',
        options,
      },
    }],
  },
});

exports.loadFonts = ({ include, exclude, options } = {}) => ({
  module: {
    rules: [
      {
        // Capture eot, ttf, woff, and woff2
        test: /\.(eot|ttf|woff|woff2)(\?v=\d+\.\d+\.\d+)?$/,
        include,
        exclude,
        use: {
          loader: 'file-loader',
          options,
        },
      },
    ],
  },
});

exports.loadJavaScript = ({ include, exclude } = {}) => ({
  module: {
    rules: [
      {
        test: /\.js$/,
        include,
        exclude,
        use: 'babel-loader',
      },
    ],
  },
});

exports.generateSourceMaps = ({ type }) => ({
  devtool: type,
});



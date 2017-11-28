const ExtractTextPlugin = require('extract-text-webpack-plugin');
const PurifyCSSPlugin = require("purifycss-webpack");

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
          'sass-loader',
        ],
      },
      // {
      //   test: /\.css$/,
      //   loader: 'sass-loader',
      // }
    ],
  },
});

exports.extractCSS = ({include, exclude, use}) => {
  const plugin = new ExtractTextPlugin({
    allChunks: true,
    filename: '[name].css',
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
  loader: "postcss-loader",
  options: {
    plugins: () => [require("autoprefixer")()],
  },
});

exports.purifyCSS = ({path}) => ({
  plugins: [new PurifyCSSPlugin({path})]
})

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

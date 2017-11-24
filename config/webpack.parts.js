exports.devServer = ({host, port} = {}) => ({
  devServer: {
    historyApiFallback: true,
    stats: 'errors-only',
    host,//默认到localhost
    port,//默认到8080
    overlay: {
      errors: true,
      warnings: true,
    },
  },
})

exports.lintJavaScript = ({include, exclude, options}) => ({
  module: {
    rules: [
      {
        test: /\.js$/,
        include,
        exclude,
        enforce: 'pre',

        loader: 'eslint-loader',
        options,
      },
    ],
  },
})

exports.loadCSS = ({include, exclude} = {}) => ({
  module: {
    rules: [
      {
        test: /\.css$/,
        include,
        exclude,

        use: ['style-loader', 'css-loader'],
      },
    ],
  },
})

exports.babelConfig = ({include, options}) => ({
  module: {
    rules: [{
      test: /\.js$/,
      include,
      exclude: ['node_modules'],
      use: {
        loader: 'babel-loader',
        options
      }
    }]
  }
})
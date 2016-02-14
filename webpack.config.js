var path = require('path');
var webpack = require('webpack');
var HtmlWebpackPlugin = require('html-webpack-plugin');
var autoprefixer = require('autoprefixer');

module.exports = {
  entry: {
    app: './src/index.js'
  },
  devtool: 'cheap-module-source-map',
  output: {
    filename: '[name].bundle.js',
    sourceMapFilename: '[file].map',
    path: './dist',
    publicPath: '/'
  },
  resolve: {
    root: [
      path.join(__dirname, 'src'),
      path.join(__dirname, 'node_modules'),
    ],
    moduleDirectories: [
      'node_modules'
    ]
  },
  module: {
    loaders: [
      {
        test: /\.jsx?$/,
        exclude: /(node_modules|bower_components)/,
        loader: 'babel'
      },
      {
        test: /\.html$/,
        loader: "file?name=[name].[ext]",
      },
      {
        test: /(\/src\/[\w]+\.css$)|(\/node_modules\/.+\.css$)/,
        loaders: [
          'style-loader',
          'css-loader!postcss-loader'
        ]
      },
      {
        test: /\/components\/.+\.css$/,
        loaders: [
          'style-loader',
          'css-loader?modules&sourceMap&importLoaders=1&localIdentName=[name]__[local]___[hash:base64:5]!postcss-loader'
        ]
      },
      { test: /\.png$/, loader: "url-loader?limit=100000" },
      { test: /\.jpg$/, loader: "file-loader" },
      { test: /\.gif$/, loader: "file-loader" },
      { test: /\.json$/, loader: "file-loader" },
      { test: /\.woff2?(\?v=\d+\.\d+\.\d+)?$/, loader: "url?limit=10000&mimetype=application/font-woff" },
      { test: /\.ttf(\?v=\d+\.\d+\.\d+)?$/, loader: "url?limit=10000&mimetype=application/octet-stream" },
      { test: /\.eot(\?v=\d+\.\d+\.\d+)?$/, loader: "file" },
      { test: /\.svg(\?v=\d+\.\d+\.\d+)?$/, loader: "url?limit=10000&mimetype=image/svg+xml" }
    ]
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new HtmlWebpackPlugin({
      template: 'src/index.html',
      inject: 'body'
    }),
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: JSON.stringify(process.env.NODE_ENV || 'development'),
        APP_ENV: JSON.stringify('browser')
      },
    })
  ],
  postcss: [autoprefixer],
  devServer: {
    contentBase: "./dist",
    noInfo: true, //  --no-info option
    hot: true,
    inline: true,
    historyApiFallback: true
    // host : '192.168.0.252'
  }
};

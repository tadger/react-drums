var path = require('path');
var webpack = require('webpack');

module.exports = {
  cache: true,

  devtool: 'eval-source-map',

  entry: [
    'webpack-dev-server/client?http://localhost:3000', // dev-server:port
    'webpack/hot/only-dev-server', // 'only' prevents reload on errors
    './src/app/index' // app's entry point
  ],

  devServer: {
    contentBase: './src/'
  },

  output: {
    path: path.join(__dirname, 'dist'),
    filename: 'bundle.js',
    publicPath: '/assets/'
  },

  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new webpack.optimize.OccurenceOrderPlugin(),
    new webpack.optimize.UglifyJsPlugin({
      mangle: true,
      output: { comments: false }
    })
  ],

  noParse: /bower_components/,

  module: {
    loaders: [
      {
        test: /\.jsx?$/,
        include: path.join(__dirname, 'src'),
        exclude: /(node_modules|bower_components)/,
        loaders: ['react-hot-loader/webpack', 'babel']
      },
      {
        test: /\.html$/,
        exclude: /(node_modules|index\.html)/,
        loaders: ['raw-loader']
      },
      {
        test: /\.wav$/,
        exclude: /(node_modules|bower_components)/,
        loaders: ['file?name=[path][name].[ext]']
      },
      {
        // required for bootstrap icons
        test: /\.(woff|woff2)(\?(.*))?$/,
        exclude: /node_modules/,
        loaders: ['url?name=fonts/[hash].[ext]&limit=5000&mimetype=application/font-woff']
      },
      {
        test: /\.ttf(\?(.*))?$/,
        exclude: /node_modules/,
        loaders: ['file?name=fonts/[hash].[ext]']
      },
      {
        test: /\.eot(\?(.*))?$/,
        exclude: /node_modules/,
        loaders: ['file?name=fonts/[hash].[ext]']
      },
      {
        test: /\.svg(\?(.*))?$/,
        exclude: /node_modules/,
        loaders: ['file?name=fonts/[hash].[ext]']
      },
      {
        test: /\.css$/,
        loader: 'style!css',
        exclude: /node_modules/
      },
      {
        test: /\.less$/,
        exclude: /node_modules/,
        loader: 'style!css!less'
      },
      {
        test: /\.png$/,
        exclude: /node_modules/,
        loader: 'url'
      }
    ]
  }
};

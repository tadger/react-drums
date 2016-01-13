var webpack = require('webpack');
var WebpackDevServer = require('webpack-dev-server');
var config = require('./webpack.config');

// webpack-dev-server options
var options = {
  publicPath: config.output.publicPath,
  hot: true,
  stats: 'normal',
  contentBase: config.devServer.contentBase
};

new WebpackDevServer(webpack(config), options)
  .listen(3000, 'localhost', function (err, result) {
    if (err) console.error(err);

    console.log('Listening at localhost:3000');
  });

const webpack = require('webpack')
const WebpackDevServer = require('webpack-dev-server')
const config = require('./webpack.config')

// webpack-dev-server options
const options = {
  publicPath: config.output.publicPath,
  hot: true,
  stats: 'normal',
  contentBase: config.devServer.contentBase
}

new WebpackDevServer(webpack(config), options)
  .listen(3000, 'localhost', (err, result) => {
    if (err) console.error(err)
    console.log('Listening at localhost:3000')
  })

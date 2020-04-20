const webpack = require('webpack')
const path = require('path')
const pkg = require('./package.json')
const libraryName = pkg.name
const MiniCssExtractPlugin = require('mini-css-extract-plugin')

const plugins = [
  new webpack.optimize.ModuleConcatenationPlugin(),
  new MiniCssExtractPlugin()
]

const config = {
  entry: [
    path.resolve(__dirname, './src/index.js'),
    path.resolve(__dirname, './styles/app.css')
  ],
  devtool: 'source-map',
  output: {
    path: path.resolve(__dirname, './lib'),
    filename: 'bundle.js',
    library: libraryName,
    libraryTarget: 'umd',
    umdNamedDefine: true
  },
  module: {
    rules: [
      {
        test: /(\.jsx|\.js)$/,
        loader: 'babel-loader',
        exclude: /(node_modules|bower_components)/
      },
      {
        test: /(\.jsx|\.js)$/,
        loader: 'eslint-loader',
        exclude: /node_modules/
      },
      {
        test: /\.css$/,
        use: [MiniCssExtractPlugin.loader, 'css-loader']
      }
    ]
  },
  resolve: {
    modules: [path.resolve('./node_modules'), path.resolve('./src')],
    extensions: ['.json', '.js']
  },
  externals: {
    moment: 'moment'
  },
  plugins: plugins
}

// eslint-disable-next-line fp/no-mutation
module.exports = config

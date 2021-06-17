const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')
const FriendlyErrorsWebpackPlugin = require('friendly-errors-webpack-plugin')
const ESLintPlugin = require('eslint-webpack-plugin')
const PrettierPlugin = require("prettier-webpack-plugin")
const glob = require('glob')
const config = require('./project.config')

function MAPOption() {
  const entry = {}
  const htmlWebpackPlugins = []
  const entryFiles = glob.sync(path.resolve('.', './src/pages/*/index.js'))

  entryFiles.map((item, index) => {
    const entryFile = entryFiles[index]
    const match = entryFile.match(/src\/pages\/(.*)\/index\.js/)
    const pageName = match && match[1]
    const templateName = pageName.split('-')[1]

    entry[templateName] = entryFile
    htmlWebpackPlugins.push(
      new HtmlWebpackPlugin({
        title: config.name,
        filename: `${templateName}.html`,
        template: path.resolve('.', `./src/pages/${pageName}/${templateName}.ejs`),
        chunks: [templateName]
      })
    )
  })

  return {
    entry,
    htmlWebpackPlugins
  }
}

const {entry, htmlWebpackPlugins} = MAPOption()

module.exports = {
  entry: entry,
  output: {
    filename: '[name].js',
    path: path.resolve('.', 'dist'),
  },
  resolve: {
    extensions: ['.js', '.jsx', '.json'],
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        use: ['babel-loader?cacheDirectory'],
        exclude: /node_modules/,
      },
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader', 'postcss-loader'],
      },
      {
        test: /\.styl$/,
        use: ['style-loader', 'css-loader', 'postcss-loader', 'stylus-loader'],
      },
      {
        test: /\.s[ac]ss$/i,
        use: ['style-loader', 'css-loader', 'postcss-loader', 'sass-loader'],
      },
      {
        test: /\.less$/,
        use: ['style-loader', 'css-loader', 'postcss-loader', 'less-loader'],
      },
      {
        test: /\.(png|svg|jpg|gif)$/,
        use: ['file-loader'],
      },
      {
        test: /\.(woff|woff2|eot|ttf|otf)$/,
        use: ['file-loader'],
      },
      {
        test: /\.(csv|tsv)$/,
        use: ['csv-loader'],
      },
      {
        test: /\.xml$/,
        use: ['xml-loader'],
      },
    ],
  },
  devtool: 'inline-source-map',
  optimization: {
    minimize: false,
  },
  plugins: [
    new CleanWebpackPlugin(),
    new FriendlyErrorsWebpackPlugin(),
    new ESLintPlugin({
      fix: true,
      // failOnError: true
    }),
    new PrettierPlugin()
  ].concat(htmlWebpackPlugins),
  devServer: {
    hot: true,
    port: config.port,
    index: 'hello.html',
    contentBase: './dist',
    proxy: config.proxy,
  },
  stats: 'errors-only',
}

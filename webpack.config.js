const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')
const { VueLoaderPlugin } = require('vue-loader')
const SpeedMeasurePlugin = require('speed-measure-webpack-plugin')
const smp = new SpeedMeasurePlugin()

const webpackConfig = {
  mode: 'development',
  entry: path.resolve(__dirname, './src/main.js'),
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'js/[name].js',
  },
  devServer: {
    port: 8080,
    open: true,
  },
  module: {
    rules: [
      {
        test: /\.vue$/,
        loader: 'vue-loader',
      },
      {
        test: /\.css$/i,
        use: ['style-loader', 'css-loader'],
      },
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: [['@babel/preset-env']],
          },
        },
      },
    ],
  },

  plugins: [
    new HtmlWebpackPlugin({
      title: 'Hello World!',
      template: path.resolve(__dirname, 'index.html'),
    }),
    new VueLoaderPlugin(),
    new CleanWebpackPlugin(),
  ],
}
const VueLoaderPluginIndex = webpackConfig.plugins.findIndex(
  (e) => e.constructor.name === 'VueLoaderPlugin'
)
const VueLoaderPluginSave = webpackConfig.plugins[VueLoaderPluginIndex]
const configToExport = smp.wrap(webpackConfig)
configToExport.plugins[VueLoaderPluginIndex] = VueLoaderPluginSave

module.exports = configToExport

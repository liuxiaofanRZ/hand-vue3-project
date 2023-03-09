const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')
const { VueLoaderPlugin } = require('vue-loader')
const SpeedMeasurePlugin = require('speed-measure-webpack-plugin')
const smp = new SpeedMeasurePlugin()

const webpackConfig = {
  mode: process.env.NODE_ENV,
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
      // 处理图片
      {
        test: /\.(png|jpg|gif)$/i,
        type: "asset",
        generator: {
          filename:'img/[hash][ext][query]'
        }
      },
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

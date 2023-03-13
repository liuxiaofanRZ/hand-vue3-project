const path = require('path')
const webpack = require("webpack")
const HtmlWebpackPlugin = require('html-webpack-plugin')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')
const { VueLoaderPlugin } = require('vue-loader')
const SpeedMeasurePlugin = require('speed-measure-webpack-plugin')
const smp = new SpeedMeasurePlugin()

const webpackConfig = {
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
    new webpack.DefinePlugin({
      PRODUCTION: JSON.stringify('true'),
      VERSION: JSON.stringify('5fa3b9'),
      BROWSER_SUPPORTS_HTML5: true,
      TWO: '1+1',
      'nodeEnv.test':JSON.stringify(1123123),
      "process.env.HELLO_TEST":JSON.stringify('lalalalal')
    })
  ],
}
const VueLoaderPluginIndex = webpackConfig.plugins.findIndex(
  (e) => e.constructor.name === 'VueLoaderPlugin'
)
const VueLoaderPluginSave = webpackConfig.plugins[VueLoaderPluginIndex]
const configToExport = smp.wrap(webpackConfig)
configToExport.plugins[VueLoaderPluginIndex] = VueLoaderPluginSave

module.exports = function (env,argv) {
  console.log(env)
  console.log('------')
  console.log(argv)
  console.log('------')
  // console.log(process.env)
  return configToExport
}

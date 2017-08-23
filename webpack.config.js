// 开发效率
// 网站性能优化
// 解决模块化问题
// 代码文件、图片压缩

const path = require('path'); // 核心模块，用来处理路径
const HtmlWebpackPlugin = require('html-webpack-plugin'); // 处理index
const CleanWebpackPlugin = require('clean-webpack-plugin'); // 清除目录
const webpack = require('webpack');

function join(...args) {
  return path.join(__dirname, ...args);
}

module.exports = {
  entry: join('./src/main.js'), // 如果是相对路径，./不能省，建议写成动态的绝对路径
  output: {
    path: join('./dist'),
    filename: 'bundle.js'
  },
  devtool: 'inline-source-map', // 配置该选项，会在开发阶段加入source-map

  // webpack-dev-server的配置选项
  // 类似Apache服务软件的文字文件
  devServer: {
    contentBase: './dist',
    hot: true,
    proxy: {
      '/api': {
        target: 'http://api.douban.com/v2/',
        // changeOrigin: true, // 如果没有changeOrigin，则代理服务器请求的host直接就是localhost:8080
        // 豆瓣的server是根据host要映射到具体的请求服务器，所以这里加入
        // 带着target中的 host去请求豆瓣api服务器
        changeOrigin: true, // 代理服务器会将host改为api.douban.com
        pathRewrite: { '^/api': '' }
      }
    },
    port: 8080
  },
  plugins: [
    // 打包之前先把dist目录清除
    new CleanWebpackPlugin([join('./dist')]),
    new webpack.HotModuleReplacementPlugin(), // 配置热更新
    new HtmlWebpackPlugin({
      template: join('./index.html')
    })
  ],
  module: {
    rules: [
      // 当 import .css 文件资源的时候，使用 style-loader 和 css-loader 加载处理
      {
        test: /\.css$/,
        use: [
          'style-loader',
          'css-loader'
        ]
      },
      { // 当加载以 /\.(png|svg|jpg|gif)$/ 结尾的后缀名的文件的时候，使用 file-loader 加载处理
        test: /\.(png|svg|jpg|gif)$/,
        use: [
          'file-loader'
        ]
      },
      {
        test: /\.(woff|woff2|eot|ttf|otf)$/,
        use: [
          'file-loader'
        ]
      },
      {
        test: /\.js$/,
        exclude: /(node_modules|bower_components)/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['env']
          }
        }
      },
      {
        test: /\.less$/,
        use: [
          'style-loader',
          'css-loader',
          'less-loader' // less-loader 依赖于 less
        ]
      },
      {
        test: /\.vue$/,
        use: ['vue-loader'] // 依赖于 vue-template-compiler
      }
    ]
  }
};
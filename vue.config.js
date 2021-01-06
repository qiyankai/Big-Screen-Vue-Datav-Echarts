const path = require('path')
const resolve = dir => {
  return path.join(__dirname, dir)
}
module.exports = {
  publicPath: './',
  chainWebpack: config => {
    config.resolve.alias
      .set('_c', resolve('src/components')) // key,value自行定义，比如.set('@@', resolve('src/components'))
  },
  devServer: {
    proxy: {
        '/dev-api': {
            // target: 'http://114.251.219.36:9000',
            target: 'http://jyfw.bjrd.gov.cn/datav/',
            ws: true,
            changeOrigin: true,
            pathRewrite: {'^/dev-api' : ''}
        }
    }
  }
}
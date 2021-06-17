const package = require('../package.json')

module.exports = {
  // 项目名称
  name: package.name,
  // 项目版本
  version: package.version,
  // 开发监听端口
  port: 8080,
  // 服务器地址
  proxy: {
    '/api/v1': {
      target: 'http://10.111.23.211:9000',
      pathRewrite: { '^/api/v1': '' },
      changeOrigin: true,
      secure: true,
    },
  },
}

/*配置文件的默认js模块，与对应配置模块组合，可以应对开发环境，测试环境和生产环境，需要config-lite 模块来读取*/
module.exports = {
  port: 3000,	// 程序启动要监听的端口号
  session: {	//express-session 的配置信息
    secret: 'myblog',
    key: 'myblog',
    maxAge: 2592000000
  },
  mongodb: 'mongodb://localhost:27017/myblog'	//mongodb 的地址，myblog 为 db 名
};
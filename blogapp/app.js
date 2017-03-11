var path = require('path');
var express = require('express');
//var bodyParser = require('body-parser');
var session = require('express-session');
var MongoStore = require('connect-mongo')(session);
//var flash = require('connect-flash');
var config = require('config-lite');
var routes = require('./routes/routes');
var pkg = require('./package');

var mongoose = require("mongoose");

var app = express();

app.use(session({
  name: config.session.key,// 设置 cookie 中保存 session id 的字段名称
  secret: config.session.secret,// 通过设置 secret 来计算 hash 值并放在 cookie 中，使产生的 signedCookie 防篡改
  resave: true,// 强制更新 session
  saveUninitialized: false,// 设置为 false，强制创建一个 session，即使用户未登录
  cookie: {
    maxAge: config.session.maxAge// 过期时间，过期后 cookie 中的 session id 自动删除
  },
  store: new MongoStore({// 将 session 存储到 mongodb
    url: config.mongodb// mongodb 地址
  })
}));

// 处理表单及文件上传的中间件
app.use(require('express-formidable')({
  uploadDir: path.join(__dirname, 'public/img'),// 上传文件目录
  keepExtensions: true,// 保留后缀
  multiples: true, // req.files to be arrays of files 
}));

//数据库连接
var db = mongoose.connect(config.mongodb);  //链接数据库
db.connection.on("error", function(error) {
    console.log("数据库连接失败：" + error);
});
db.connection.on("open", function() {
    console.log("------数据库连接成功！------");    //数据模板创建用Schema模块去创建 写于 ../app/schemas下
});
// 路由
routes(app);

// 监听端口，启动程序
app.listen(config.port, function () {
  console.log(`${pkg.name} listening on port at http://127.0.0.1:${config.port}`);
});
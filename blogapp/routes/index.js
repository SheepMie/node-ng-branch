module.exports = function (app) {
  app.all('*', function (req, res, next) {
    res.statusCode = 200;
    res.sendDate = false;
    res.setHeader( //用设置请求头的方法可是后续实现json发送
                    //setHeader与writeHeader的区别。set只能一次设置一个头信息。write可以多个。write可以设置状态消息与状态文本。set设置的信息将与write设置的信息合并
        "Content-Type", "text/html;charset=utf-8"
    ); //设置响应头属性值
    res.setHeader(
        'Access-Control-Allow-Origin', '*' //解决跨域问题
    ); //设置响应头属性值
    next();
  });
  app.use('/signup', require('./signup'));
  app.use('/signin', require('./signin'));
  app.use('/signout', require('./signout'));
  app.use('/posts', require('./posts'));
};
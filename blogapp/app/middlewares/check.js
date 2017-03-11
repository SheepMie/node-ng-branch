module.exports = {
  checkLogin: function checkLogin(req, res, next) {
    if (!req.session.user) {  //用户不存在。。
      req.flash('error', '未登录'); //返回未登录的提示
      return res.redirect('/signin'); //返回给页面的操作
    }
    next();
  },

  checkNotLogin: function checkNotLogin(req, res, next) {
    if (req.session.user) { //用户存在。。
      req.flash('error', '已登录');  //返回已登录的提示
      //return res.redirect('back'); //返回之前的页面
      return;
    }
    next();
  }
};
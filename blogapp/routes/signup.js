var fs = require('fs');			//文件读取
var path = require('path');
//var sha1 = require('sha1');		//盐加密，由于现在是前端加密，所以在这里可以不用
var express = require('express');
var router = express.Router();

var UserModel = require('../models/users');
var checkNotLogin = require('../middlewares/check').checkNotLogin;

// GET /signup 注册页
router.get('/', checkNotLogin, function(req, res, next) {
  res.send(req.flash());
});

// POST /signup/passimg 用户头像上传
router.post('/passimg', checkNotLogin, function(req, res, next) {
  var avatar = req.files.avatar.path.split(path.sep).pop(); //截取图片后缀地址
  console.log(avatar);
  res.send("success");
  //fs.unlink(req.files.avatar.path);//删除文件
});
// POST /signup 用户注册数据
router.post('/', checkNotLogin, function(req, res, next) {
  var name = req.fields.name;
  var gender = req.fields.gender;
  var bio = req.fields.bio;
  var password = req.fields.password;

  // 待写入数据库的用户信息
  var user = {
    name: name,
    password: password,
    gender: gender,
    bio: bio,
  };
  res.send({"success":"1","name":name});
  // 用户信息写入数据库
  UserModel.create(user)
    .then(function (result) {
      // 此 user 是插入 mongodb 后的值，包含 _id
      user = result.ops[0];
      // 将用户信息存入 session
      delete user.password;
      req.session.user = user;
      // 写入 flash
      req.flash('success', '注册成功');
      // 跳转到首页
      res.redirect('/posts');
    })
    .catch(function (e) {
      // 注册失败，异步删除上传的头像
      //fs.unlink(req.files.avatar.path);
      // 用户名被占用则跳回注册页，而不是错误页
      if (e.message.match('E11000 duplicate key')) {
        req.send('error', '用户名已被占用');
        return
      }
      next(e);
    });
});

module.exports = router;
var fs = require('fs');			//文件读取
var path = require('path');
var express = require('express');
var router = express.Router();

var UserModel = require('../models/userModel');
var checkNotLogin = require('../middlewares/check').checkNotLogin;

// GET /signup 注册页
router.get('/', checkNotLogin, function(req, res, next) {
  res.send(req.flash());
});

// GET /signup/hasnamed 检查是否有重命名
router.get('/hasnamed', checkNotLogin, function(req, res, next) {
  var name = req.query.name;
  console.log(name);
  UserModel.findOne({
      name: name
  }, function(error, doc) {
      if (error) {
        console.log("error :" + error);
        return;
      } else {
        if(doc){
          res.send({code:606,tip:"该用户名已注册"});
        }else{
          res.send({code:666,tip:"该用户名可注册"})
        }
      }
  });
});

// POST /signup/passimg 用户头像上传
router.post('/passimg', function(req, res, next) {
  var name = req.query.name;
  var avatar = req.files.avatar.path.split(path.sep).pop(); //截取图片后缀地址
  console.log(avatar);
  console.log(req.query.name);                        //字段添加在url后面，则要用query
  //fs.unlink(req.files.avatar.path);//删除文件
  //按条件查找数据库，有则用更新的方式增加图片地址
  var conditions = {name : name};

  var update = {$set : { avatar : avatar }};

  UserModel.update(conditions, update, function(error){     //更新和删除需要用model
      if(error) {
          console.log(error);
          return;
      } else {
          console.log('Update success!');
          res.send("success");
      }
  });
});
// POST /signup 用户注册数据
router.post('/passdata', checkNotLogin, function(req, res, next) {
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
  // 用户信息写入数据库
  var entity = new UserModel(user);   //Entity,通过Model创建的实体，它也可以操作数据库
  entity.save(function(error, doc) {  //存入mongodb,model调用的是create方法，entity调用的是save方法，记住了嘛！
      if (error) {
          console.log("error :" + error);
          return;
      } else {
          console.log(doc);
          res.send({          //以json形式返回接口信息
              success:"1",
              name:name
          });
      }
  });
});

module.exports = router;
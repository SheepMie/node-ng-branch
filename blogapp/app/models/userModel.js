var mongoose = require("mongoose");
var UserSchema = require("../schemas/userSchema"); //引入模式文件

/*创建模型*/
var UserSchema = mongoose.model("User", UserSchema); //生成TestModel模型和模式,其在数据库中名为test1,在数据库中生成集合,注意只能小写或数字组合，大写会改成小写加s

module.exports = UserSchema; //导出模型
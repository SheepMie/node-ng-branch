var config = require('config-lite');
var Mongolass = require('mongolass');
var mongolass = new Mongolass();
mongolass.connect(config.mongodb);	//链接mongodb

/*user*/
exports.User = mongolass.model('User', {			//定义了用户表的 schema,成并导出了 User 这个 model，
  name: { type: 'string' },
  password: { type: 'string' },
  avatar: { type: 'string' },
  gender: { type: 'string', enum: ['m', 'f', 'x'] },
  bio: { type: 'string' }
});
exports.User.index({ name: 1 }, { unique: true }).exec();// name 的唯一索引,根据用户名找到用户，用户名全局唯一
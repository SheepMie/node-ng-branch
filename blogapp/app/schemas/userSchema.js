var mongoose = require("mongoose");

/*骨架模板创建*/
var UserSchema = new mongoose.Schema({ //创建UserSchema数据框架
    name: {
        type: String 
    },
    password: {
        type: String
    },
    time: {
        type: Date,
        default: Date.now
    },
    avatar: {
        type: String,
        default: ''
    },
    bio: { 
    	type: String,
    	default: '' 
    },
    gender: { 
    	type: String, 
    	enum: ['m', 'f', 'x'] 
    }
});

module.exports = UserSchema;
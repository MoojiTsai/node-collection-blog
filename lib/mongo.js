const mongoose = require('mongoose'), Schema = mongoose.Schema;;
var db = mongoose.createConnection('mongodb://localhost/localhost'); //创建一个数据库连接
db.on('error',console.error.bind(console,'连接错误:'));

exports.UserSchema = new Schema({
    name: { type: 'string', required: true },
    password: { type: 'string', required: true },
    avatar: { type: 'string', required: true },
    gender: { type: 'string', enum: ['m', 'f', 'x'], default: 'x' },
    bio: { type: 'string', required: true }
  });
exports.UserSchema.index({ name: 1 }, { unique: true }); // 根据用户名找到用户，用户名全局唯一
exports.UserModel =   db.model('User',exports.UserSchema );

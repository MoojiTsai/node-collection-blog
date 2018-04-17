const UserModel = require('../lib/mongo').UserModel

module.exports = {
  // 注册一个用户
  create: function create (user) {
    return UserModel.create(user).exec()
  }
}

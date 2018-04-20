const User = require('../lib/mongo').UserModel

module.exports = {
  // 注册一个用户
  create: function(user) {
    let data = new User(user);
    data.save(function(err,result){
      if(err) console.error(err);
      delete user.password
    });
    return User;
  },
  getUserByName: function (name) {
    
    return User.findOne({ account: name },function(err,result){
        if(err) {return console.log('err: ', err)};
        return result;
    });
  }

  
}

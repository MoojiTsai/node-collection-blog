const User = require('../lib/mongo').UserModel
const bcrypt = require('bcrypt');
module.exports = {
  // 注册一个用户
  create: function (user) {
    let data = new User(user);
    data.save(function (err, result) {
      if (err) console.error(err);
      delete user.password
    });
    return User;
  },
  getUserByName: function (name) {

    return User.findOne({ account: name });
  },
  compareLoginUser: function (username, password_compare) {


    return User.findOne({ account: username }).exec().then(
      function (result) {
          if(result){
            bcrypt.compare(password_compare, result.password, function (err, res) {
              if (err) console.log(err);
              if (res == true) {  
                //do something
              }
            });
          }
      },function(reject){
        console.log('reject: ', reject);
      } 
    );
    
  }


}

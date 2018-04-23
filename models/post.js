const Post = require('../lib/mongo').PostModel 

module.exports = {
    // 注册一个用户
    create: function (post) {
        let data = new Post(post);
        data.save(function (err, result) {
            if (err) console.error(err);
            console.log('err: ', err);
            return err; 
        });
        return Post;
    },


}

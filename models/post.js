const Post = require('../lib/mongo').PostModel 

module.exports = {
    // 注册一个用户
    createPost: function (post) {
        let data = new Post(post);
        data.save(function (err, result) {
            if (err) console.error(err);
            return err; 
        });
        return Post;
    },

    getPosts:function(){
        return Post.find({});
    },
    getPost:function(id){
        return Post.findOne({_id:id});
    },
    updatePost:function(id,data){
        return Post.findByIdAndUpdate(id,data);
    },
    deletePost:function(id,data){
        return Post.findByIdAndRemove(id); 
    } 


}

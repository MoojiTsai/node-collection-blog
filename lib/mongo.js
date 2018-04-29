const mongoose = require('mongoose'), Schema = mongoose.Schema;;
mongoose.connect('mongodb://localhost/localhost');
var db = mongoose.connection;


let UserSchema = new Schema({
    account: { type: String, required: true },
    password: { type: String, required: true }
  });
UserSchema.index({ account: 1 }, { unique: true }); 
exports.UserModel =  mongoose.model('User',UserSchema );


let PostSchema = new Schema({
  name: String,
  description: String, 
  image: String ,
  categories: [String],
  sort:Number,
  datetime : {
    type: Date,
    default: Date.now
},

}); 

PostSchema.index({ name: 1 }, { unique: true }); 
exports.PostModel=mongoose.model('Post',PostSchema); 

let CategorySchema = new Schema({
  name: String,
  parent: String, 
}); 

CategorySchema.index({ name: 1 }, { unique: true }); ; 
exports.CategoryModel=mongoose.model('Category',CategorySchema); 




const config = require('config-lite')(__dirname);
const mongoose = require('mongoose'), Schema = mongoose.Schema;;
mongoose.connect(config.mongodb);
var db = mongoose.connection;


let UserSchema = new Schema({
    account: { type: String, required: true },
    password: { type: String, required: true }
  });
UserSchema.index({ account: 1 }, { unique: true }); 
exports.UserModel =  mongoose.model('User',UserSchema );


let PortfolioSchema = new Schema({
  name: String,
  description: String, 
  featured:{type:Boolean,default:false}, 
  image: String ,
  categories: [String],
  sort:Number,
  datetime : {
    type: Date,
    default: Date.now

},
}); 

PortfolioSchema.index({ name: 1 }, { unique: true }); 
exports.PortfolioModel=mongoose.model('Portfolio',PortfolioSchema); 

let CategorySchema = new Schema({
  name: String,
  parent: String, 
});

CategorySchema.index({ name: 1 }, { unique: true }); 
exports.CategoryModel=mongoose.model('Category',CategorySchema);



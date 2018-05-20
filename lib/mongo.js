const config = require('../config/default')();
// console.log('config: ', config);
const mongoose = require('mongoose'), Schema = mongoose.Schema;;
mongoose.connect(config.mongodb).then(
  () => { /** ready to use. The `mongoose.connect()` promise resolves to undefined. */ },
  err => { console.log(err) }
);
// var db = mongoose.connection;


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
  categories:  [{ type: Schema.Types.ObjectId, ref: 'Category' }],
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
  slug:String, 
  parent: String, 
});

CategorySchema.index({ name: 1 }, { unique: true }); 
exports.CategoryModel=mongoose.model('Category',CategorySchema);


let MenuSchema = new Schema({
  name: String,
  link:String,  
});

MenuSchema.index({ name: 1 },{unique: true}); 
exports.MenuModel=mongoose.model('Menu',MenuSchema);






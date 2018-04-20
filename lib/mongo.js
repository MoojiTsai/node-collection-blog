const mongoose = require('mongoose'), Schema = mongoose.Schema;;
mongoose.connect('mongodb://localhost/localhost');
var db = mongoose.connection;


let UserSchema = new Schema({
    account: { type: String, required: true },
    password: { type: String, required: true }
  });
UserSchema.index({ account: 1 }, { unique: true }); 
exports.UserModel =  mongoose.model('User',UserSchema );

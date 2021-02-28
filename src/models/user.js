const mongoose=require('mongoose');

const Schema=mongoose.Schema;

let userSchema=new Schema({
    name:String,
    age:Number,
    username:String,
    password:String
    
},{collection:'user'});

module.exports=mongoose.model('User',userSchema);
const mongoose=require('mongoose');

const Schema=mongoose.Schema;

let userSchema=new Schema({
    name:String,
    age:Number,
    
},{collection:'user'});

module.exports=mongoose.model('User',userSchema);
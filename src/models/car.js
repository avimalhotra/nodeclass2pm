const mongoose=require('mongoose');

const Schema=mongoose.Schema;

let carSchema=new Schema({
    name:String,
    type:String,
    price:Number,
    fuel:String,
},{collection:'cars'});

module.exports=mongoose.model('Car',carSchema);
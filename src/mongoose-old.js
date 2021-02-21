const mongoose=require('mongoose');

mongoose.connect('mongodb://localhost:27017/sample', {useNewUrlParser: true, useUnifiedTopology: true});

const Schema = mongoose.Schema;

const Car = new Schema({
    name:String,
    type:String,
    price:Number,
    fuel:String,
},{collection:'cars'});

var model=mongoose.model("model",Car); 

var alto=new model({name:"alto", type:'hatchback', price:450000, fuel:'petrol' });


const db=mongoose.connection;

db.on('error', function (err) { throw err }); 

db.once('open', function callback() {
   console.log('mongoose connected to mongodb');
  // db.close();

   /* alto.save((err,data)=>{
       if(err){
            console.log("Error found");
            db.close();
       }
       else{
            console.log("Data saved");
            db.close();
       }
   }); */

   model.find({name:"swift"},(err,data)=>{
    if(err){console.log(err);}
    else{ console.log(data)}                    // array
});

});
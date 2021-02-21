const mongoose=require('mongoose');
mongoose.connect('mongodb://localhost:27017/sample', {useNewUrlParser: true, useUnifiedTopology: true});

const db=mongoose.connection;

db.on('error',(err)=>{
    throw err;
});

db.once('open',()=>{
    console.log("Mongoose connected");
});

module.exports=db;

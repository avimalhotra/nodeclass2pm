const events=require("events").EventEmitter;

let emiiter=new events();


emiiter.on("myevent",(arg,obj)=>{

    console.log(`Event 1 Done by ${arg}`);
    obj.handled=true;
});

emiiter.on("myevent",(arg,obj)=>{
    if( obj.handled==false ){ console.log(`Event 2 Done by ${arg}`); }
});


// for account and login
require('./events/index');

// emiiter.once("myevent",(arg)=>{
//     console.log(`Single Event Done by ${arg}`);
// });


emiiter.emit("myevent","user",{ handled:false });

//emiiter.emit("myevent","user");
//emiiter.emit("myevent","admin");






/* const fs=require('fs');
    
    fs.ReadStream("./src/data.json").on("open",()=>{
        console.log("file open");
    });
 */

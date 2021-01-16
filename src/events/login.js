const { emit } = require('./index');
let emitter=require('./index');

emitter.on('login',(arg)=>{
    console.log(`login process started at ${arg}`);
});

emitter.on('login',()=>{
    console.log("login done");
});


const { emit } = require('./index');
let emitter=require('./index');

emitter.on('account',(arg)=>{
    console.log(`Account Open`);
});

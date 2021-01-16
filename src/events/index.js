const events=require("events").EventEmitter;
let emitter=new events();

module.exports=emitter;

let [login,account]=[require('./login'),require('./account')];

emitter.emit('login','12');
emitter.emit('account');

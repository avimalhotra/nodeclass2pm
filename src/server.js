
var path=require('path');                   // node js module
var os=require('os');                       // node js module

var exp=require('./module');                // module.js file in src

const colors=require("colors");             // module 3rd part


//console.log( exp.getArea());
//console.log(path.resolve('src'));
//console.log(os.totalmem());

console.log("red".red, "green".green, "blue".blue);

console.log(` name is ${ exp.user.name} and age is ${ exp.user.age}`);

console.log(exp.x);
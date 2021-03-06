const express=require("express");
const path=require("path");
const nunjucks=require("nunjucks");
const app=express();

app.use(express.static(path.resolve(__dirname,'src/public')));

// configure
nunjucks.configure(path.resolve(__dirname,'views'),{
    express:app,
    autoscape:true,
    noCache:false,
    watch:true
}); 

app.get("/",(req,res)=>{
    //res.render('index.html',{});

    res.setHeader('Content-Type','text/html');
    res.status(200).send("<h1>Hi </h1>");
});

app.listen(3000,()=>{
    console.log("express server running on ", 3000)
})
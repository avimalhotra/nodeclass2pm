const env=require("dotenv").config();
const express=require('express');
const { use } = require("./admin");
//const ejs=require("ejs");
const nunjucks=require('nunjucks');
const path=require('path');
const app=express();

const bodyparser=require('body-parser');
app.use(bodyparser.json());
app.use(bodyparser.text());
app.use(bodyparser.urlencoded({ extended: false }));

const parseurl=require('parseurl');
const cp=require('cookie-parser');
app.use(cp());

const session=require('express-session');
 // trust first proxy
app.set('trust proxy', 1);
app.use(session({
    secret:"session",
    resave:false,
    saveUninitialized:true,
    cookie:{secure:false}
}));
app.use( (req, res, next)=> {
    if (!req.session.views) {
      req.session.views = {}
    }
  
    //req.session.name="lorem";
    // get the url pathname
    var pathname = parseurl(req).pathname;
  
    // count the views
    req.session.views[pathname] = (req.session.views[pathname] || 0) + 1
  
    next()
  })



  //app.set('view engine', 'ejs');
  //app.set('views', path.join(__dirname, 'public')); 

app.use( express.static('src/public'));
// configure
nunjucks.configure(path.resolve(__dirname,'public/views'),{
    express:app,
    autoscape:true,
    noCache:false,
    watch:true
}); 


app.use((req,res,next)=>{
    next();
});


// router
const admin=require("./admin");
const user=require("./user");
const cookieParser = require("cookie-parser");
app.use('/admin',admin);
app.use('/user',user);


app.get('/',(req,res)=>{
    res.setHeader('Content-Type','text/html');
    //res.send(req.sessionID);
    //res.status(200).send('Session Views :  '+ req.session.views['/'] + ' times, ' + req.sessionID);
    //res.send(req.cookies);
    //res.send(req.signedCookies);
    //res.status(200).send('<h1>Hello Express</h1>');
    res.render("index.html",{ name:"avi",id:212, user:{ name:'abc', age:22 }, month:["jan","feb","mar","apr"] })
});

app.post("/getmonth",(req,res)=>{
    
    var search=req.body.search-1;

    var data=["sun","mon","tues","wed","thurs","fri","sat"];

   return res.send(data[search]);
});

app.get('/exit',(req,res)=>{
    req.session.destroy();
    res.status(200).send("<p>Session Destroy</p>")
});
app.get("/api",(req,res)=>{
    var data=["sun","mon","tues","wed","thurs","fri","sat"];
    //return res.status(200).send("Node JS API");
    res.header('Access-Control-Allow-Origin',"*");
    return res.status(200).send(data);
});



app.get('/setcookie',(req,res)=>{
    res.cookie("name","avinash",{maxAge:86400000, httpOnly: true});     // ( 1000*60*66*24)
    res.send("Done")
});
app.get('/getcookie',(req,res)=>{
    let name=req.cookies.name;
    if( name){
        res.send("cookie found,  name="+ req.cookies.name);
    }
    else{
        res.send("cookie not found");
    }
});

app.get('/app',(req,res)=>{
    res.status(200).send(" Application running");
});

/* Get */
app.get('/getform',(req,res)=>{
    var formdata=req.query;
    
    res.status(200).send(formdata);
    //res.status(200).json( {data:formdata} );
});
app.get('/product/:name/:model',(req,res)=>{
    res.status(200).send(req.params);
})

app.post('/postdata',(req,res)=>{

    let mail=req.body.email, pass=req.body.pass;

    if( mail=="avimalhotra505@gmail.com" && pass=="123456"){
        res.status(200).send("Thanks");
    }
    else{
        res.status(200).send("Invalid Entry");
    }
    //res.status(200).send(req.body);
});


/* Wild card handler */
app.get('/**',(req,res)=>{
    res.status(404).send(" <h1> 404, Page Not Found </h1>");
});

app.listen(process.env.PORT,process.env.IP,()=>{
    console.log(`Express Server running at http://${process.env.IP}:${process.env.PORT}`);
});
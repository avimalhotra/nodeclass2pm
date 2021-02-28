const env=require("dotenv").config();
const express=require('express');
const { use } = require("./admin");
const nunjucks=require('nunjucks');
const path=require('path');
const app=express();
//const db=require('./mdb');
//let [Car,User]=[require('./models/car'),require('./models/user')];


const bodyparser=require('body-parser');
app.use(bodyparser.json());
app.use(bodyparser.text());
app.use(bodyparser.urlencoded({ extended: false }));

const parseurl=require('parseurl');
const cp=require('cookie-parser');
app.use(cp());

const session=require('express-session');

//

// const passport=require('passport');
// let LocalStrategy=require("passport-local").Strategy;


// app.use(passport.initialize());
// app.use(passport.session());

// passport.serializeUser(function (user, done) {
//     done(null, user.id);
//   });
// passport.deserializeUser(function (user, next) {
//     next(null, user);
// });

// passport.use('local', new LocalStrategy((username, password, done) => {
   

//     User.findOne({ username: username }, (err, user) => { 
       
//       if (err) { return done(err); }
//       if (!user) { return done(null, null, { message: 'No user found!' }); }
//       if (user.password !== password) {
//         return done(null, null, { message: 'Username or password is incorrect!' });
//       }
  
//       return done(null, user, null);
//     });
//   }
// ));


// function isAuthenticated(req, res, next) {
//     if (req.isAuthenticated()) {
//       next();
//     } else {
//       res.status(403).send('Forbidden');
//     }
// }


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


app.get('/login',(req,res)=>{
    res.status(200).render("login.html");
});


app.post('/login',(req,res)=>{
    let username=req.body.username, pass=req.body.password;
    // if( email=="avi@gmail.com" &&  pass=="123456"){
    //     res.status(200).render("control.html");
    // }
    // else{
    //     res.status(200).render("login.html",{ data:"Invalid Userid or password"});
    // }

    // User.find({username:username},(err,data)=>{

    //     if(err){
    //         res.render('result.html',{ error:err});
    //     }
    //     else{ 
            
    //         if(data.length==0){
    //             res.render('result.html',{ nodata:"No User found"});
    //         }
    //         else{
                
    //             res.render('control.html',{ data:data});
    //         }
    //     }
    // });

    passport.authenticate('local', function (err, user, info) {
         
        if (err) {
          res.render('login.html', { error: err });
        } else if (!user) {
          res.render('login.html', { errorMessage: info.message });
    
        } else {
          //setting users in session
          req.logIn(user, function (err) { 
            if (err) {
              res.render('/', { error: err });
            } else {
              res.render('control.html');
            }
          })
        }
      })(req, res);
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
    var name=req.query.name;
    
    Car.find({name:name},(err,data)=>{

            if(err){
                res.render('result.html',{ error:err});
            }
            else{ 
                
                if(data.length==0){
                    res.render('result.html',{ nodata:"No car found"});
                }
                else{
                    
                    res.render('result.html',{ data:data});
                }
            }
    });
    
});
app.get('/product/:name/:model',(req,res)=>{
    res.status(200).send(req.params);
})

app.post('/savecardata',(req,res)=>{
   
    let car=new Car(req.body);

    car.save((err)=>{
        if( err){ 
            res.send("Error: "+ err);

        }
        else{ 
            res.send("Thanks");

        }
    })
   
});


/* Wild card handler */
app.get('/**',(req,res)=>{
    res.status(404).send(" <h1> 404, Page Not Found </h1>");
});

app.listen(process.env.PORT,process.env.IP,()=>{
    console.log(`Express Server running at http://${process.env.IP}:${process.env.PORT}`);
});
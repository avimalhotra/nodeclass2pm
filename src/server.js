const env=require("dotenv").config();
const express=require('express');
const app=express();


app.use( express.static('src/public'));

app.use((req,res,next)=>{
    console.log('Time: %d', Date.now());
    next();
});


app.get('/',(req,res)=>{
    res.setHeader('Content-Type','text/html');
    res.status(200).send('<h1>Hello Express</h1>');
   

});
app.get('/app',(req,res)=>{
    res.status(200).send(" Application running");
});

/* Get */
app.get('/getmonth',(req,res)=>{
    
    var data=req.query.search;
    var month;
    switch(data){
        case '1':  month="jan"; break;
        case '2':  month="feb"; break;
        case '3':  month="mar"; break;
        default:  month="invalid month"; break;
    }

    res.status(200).send(month);
});
app.get('/getform',(req,res)=>{
    var formdata=req.query;
    res.status(200).send(formdata);
    //res.status(200).json( {data:formdata} );
});
app.get('/product/:name/:model',(req,res)=>{
    res.status(200).send(req.params);
})

app.post('/postdata',(req,res)=>{
    //res.status(200).send(`Posted`);
    res.status(200).send(req.query);
});


/* Wild card handler */
app.get('/**',(req,res)=>{
    res.status(404).send(" <h1> 404, Page Not Found </h1>");
});

app.listen(process.env.PORT,process.env.IP,()=>{
    console.log(`Express Server running at http://${process.env.IP}:${process.env.PORT}`);
});
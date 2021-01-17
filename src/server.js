const http=require('http');
const ip='127.0.0.1';
const port=8080;
const fs=require('fs');


/* http.createServer((req,res)=>{
    res.end("Hello HTTP");
}).listen(80); */

const server=http.createServer( (req,res)=>{
    //res.statusCode=200;
    //res.setHeader('Content-Type','text/html');
    res.writeHead(200,{'Content-Type':'text/html'});
 
    /*
    res.write("<h1>");
    //res.write(ip+":"+port);
    //res.write(req.url);
    //res.write(req.method);
    res.write("Hello Http");
    res.write("</h1>");
    */
    if( req.method=="GET" && req.url=="/"){
        //res.write("Home Page");
        fs.readFile('src/index.html',(err,data)=>{

            if( err){
                res.writeHead(200,{'Content-Type':'text/html'});
                res.write("Error found");
                res.end();
            }
            else{
                res.writeHead(200,{'Content-Type':'text/html'});
                res.write(data);
                res.end();
            }
        });
    }
    else{
        res.write("Error");
        res.end();
    }
    
});

server.listen(port,ip,()=>{
    console.log(`Server running at http://${ip}:${port}`);
});
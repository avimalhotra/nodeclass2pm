fs.readFile('src/data.json',{encoding:'utf8'},(err,data)=>{
    if( err){console.log(err)}
    else{ console.log(data); }
});

fs.appendFile('src/data.txt'," Hello Node JS \n " ,{encoding:'utf8'},(err,data)=>{
    if( err){
        console.log(`Unable to write`);
    }
    else{
       console.log("done");  }
});

fs.unlink('src/temp.txt',(err,data)=>{
    if( err ){ console.log('Error found ',err); }
    else{ console.log("File deleted");}
});
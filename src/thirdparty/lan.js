const netList = require('network-list');

//netList.scanEach({}, (err, obj) => {console.log(obj); // device object});


netList.scan({}, (err, arr) => {
    console.log(arr); // array with all devices

    //for( let i=0; i<=24; i++  ){ console.log(arr[i]);}

   // arr.forEach((i)=>{ console.log(i);})
});
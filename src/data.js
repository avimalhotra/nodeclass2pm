

    let r=2;
    const pi=3.14;

    //let a=pi*r*r;

    global.pi=pi;                   // pi is global now
    global.getArea=function(){ return pi*r*r};                   // area is global now

    global.user={
        name:"avi",
        id:212,
        city:"New Delhi"
     };
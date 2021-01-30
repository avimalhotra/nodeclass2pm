const express=require('express');
const router=express.Router();

// middleware specific to admin
router.use(function timeLog (req, res, next) {
    console.log('Admin login at: ', Date.now())
    next()
});

router.get('/',(req,res)=>{
    res.status(200).send("hello admin");
});
router.get('/edit',(req,res)=>{
    res.status(200).send(" user edit");
});
router.get('/add',(req,res)=>{
    res.status(200).send("add users");
});
router.get('/remove',(req,res)=>{
    res.status(200).send("remove users");
});

module.exports=router;
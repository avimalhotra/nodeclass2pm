const express=require('express');
const router=express.Router();


router.get('/',(req,res)=>{
    res.status(200).send("hello user");
});
router.get('/edit',(req,res)=>{
    res.status(200).send(" user edit");
});

module.exports=router;
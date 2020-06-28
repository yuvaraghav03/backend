const express = require('express')
const router = express.Router();
const mongoose = require('mongoose')
const user = mongoose.model('user');


router.post('/signup',async(req,res)=>{
    console.log(req.body)
    const {usn,pass,email,num,username} =req.body;
    try{
        const User = new user({email,pass,usn,num,username});
         await User.save();
         res.send('hey dude')
    }catch(err){
        res.status(422).send(err.message)
    }
  
    
   
})






module.exports=router


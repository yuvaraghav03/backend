const express = require('express')
const mongoose = require('mongoose')
const jwt = require('jsonwebtoken')
const {jwtkey} = require('../keys')
const router = express.Router();
const User = mongoose.model('User');


router.post('/signup',async (req,res)=>{
   
    const {usn,pass,num,email,username} = req.body;

    try{
      const user = new User({usn,pass,email,username,num});
      await  user.save();
      const token = jwt.sign({userId:user._id},jwtkey)
      res.send({token})

    }catch(err){
      return res.status(422).send(err.message)
    }
    
})

router.post('/signin',async (req,res)=>{
    const {usn,pass} = req.body
    if(!usn || !pass){
        return res.status(422).send({error :"must provide usn or password"})
    }
    const user = await User.findOne({usn})
    if(!user){
        return res.status(422).send({error :"must provide usn or password"})
    }
    try{
      await user.comparePass(pass);    
      const token = jwt.sign({userId:user._id},jwtkey)
      res.send({token})
    }catch(err){
        return res.status(422).send({error :"must provide usn or password"})
    }
    


})


module.exports = router
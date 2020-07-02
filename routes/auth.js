const express = require('express')
const mongoose = require('mongoose')
const jwt = require('jsonwebtoken')
const {jwtkey} = require('../keys')
const router = express.Router();
const User = mongoose.model('User');
const Blogs = mongoose.model('Blogs');
const Polls = mongoose.model('Polls');
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

router.post("/blogs",async(req,res)=>{
const {username,userpic,postimage,description,date}=req.body

try {
  const Blog = new Blogs({username,userpic,postimage,description,date});
  await Blog.save();
  res.send(Blog)
} catch (err) {
  return res.status(422).send(err.message)
}

});

router.post("/polls",async(req,res)=>{
  const {question,op1,op2,backgcolor}=req.body
  
  try {
    const poll = new Polls({question,op1,op2,backgcolor});
    await poll.save();
    res.send(poll)
  } catch (err) {
    return res.status(422).send(err.message)
  }
  
  });
  router.route("/fetchpoll").get(function(req, res) {
    Polls.find({}, function(err, result) {
      if (err) {
        res.send(err);
      } else {
        res.send(result);
      }
    });
  });
module.exports = router
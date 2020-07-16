const express = require('express')
const mongoose = require('mongoose')
const router = express.Router();
const multer = require('multer');
const Profile = mongoose.model('Profile');
const fs = require("fs");
const { promisify } = require("util");
const pipeline = promisify(require("stream").pipeline);
const upload = multer();
{/*  router.post("/profile",async(req,res)=>{
    const {username,tagline}=req.body
    const {postimage}=req.file
    try {
      const profile = new Profile({username,tagline,postimage});
      await profile.save();
      res.send(profile)
    } catch (err) {
      return res.status(422).send(err.message)
    }
    
    });
  */}

router.post('/profile',upload.single("postimage"),async function(req,res,next){
  console.log(req.body);
  console.log("postimage:", req.file);
  const {
    postimage,
    body:{tagline,username}
  }=req;
  

})
 module.exports = router; 
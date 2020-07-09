const express = require('express')
const mongoose = require('mongoose')
const router = express.Router();
const multer = require('multer');
const Profile = mongoose.model('Profile');
  router.post("/profile",async(req,res)=>{
    const {username,tagline}=req.body
    
    try {
      const profile = new Profile({username,tagline});
      await profile.save();
      res.send(profile)
    } catch (err) {
      return res.status(422).send(err.message)
    }
    
    });

 module.exports = router; 
const express = require('express')
const mongoose = require('mongoose')
const Blogs = mongoose.model('Blogs');
const router = express.Router();

router.post("/blogs",async(req,res)=>{
    const {username,description,date}=req.body
    const {userpic,postimage} = req.file
    try {
      const Blog = new Blogs({username,userpic,postimage,description,date});
      await Blog.save();
      res.send(Blog)
    } catch (err) {
      return res.status(422).send(err.message)
    }
    
    });

module.exports = router;    
const express = require('express')
const mongoose = require('mongoose')
const Blogs = mongoose.model('Blogs');
const router = express.Router();

router.post("/blogs",async(req,res)=>{
    const {usn,description,date,like_count}=req.body
    const {userpic,postimage} = req.file
    try {
      const Blog = new Blogs({usn,userpic,postimage,description,date});
      
      await Blog.save();
      res.send(Blog)
    } catch (err) {
      return res.status(422).send(err.message)
    }
    
    });
    router.get('/blogfinder', (req, res, next) => {
    Blogs.find().exec((err, blog) => {
          res.render('index', { blog: blog });
      });

  });
  router.post('/posts/:id/act', (req, res, next) => {
    const action = req.body.action;
    const counter = action === 'Like' ? 1 : -1;
    Blogs.update({_id: req.params.id}, {$inc: {like_count: counter}}, {}, (err, numberAffected) => {
        res.send('');
    });
});

module.exports = router;    
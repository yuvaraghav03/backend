const express = require('express')
const mongoose = require('mongoose')
const router = express.Router();
const multer = require('multer');
const Polls = mongoose.model('Polls');
router.post("/polls",async(req,res)=>{
    const {question,op1,op2,backgcolor,opcolor,votecount}=req.body;
    
    try {
      const poll = new Polls({question,op1,op2,backgcolor,opcolor});
      await poll.save();

      res.send(poll)
      const vote = new votecount;
      await vote.save();
      res.send(vote)
    } catch (err) {
      return res.status(422).send(err.message)
    }
    
    });
    router.route("/poll").get(function(req, res) {
      Polls.find({}, function(err, result) {
        if (err) {
          res.send(err);
        } else {
          res.send(result);
        }
      });
    });
    module.exports = router;  
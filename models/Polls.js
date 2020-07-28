const mongoose = require("mongoose");
const { ObjectId } = require('mongodb');
const User = require('../models/User');
const pollSchema = new mongoose.Schema({
question:{
    type:String,
    required:true,
    unique:true,
},
op1:{
    type:String,
    required:true,
},
op2:{
    type:String,
    required:true,
},
backgcolor:{
    type:String,
    required:true,
},
opcolor:{
    type:String,
    required:true,
},
votecount:{
     type:Number,
}

});
pollSchema.methods.countVote = function() {
    const user = User;
    votecount.save();     
}
mongoose.model('Polls',pollSchema);
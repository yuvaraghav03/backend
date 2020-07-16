const mongoose = require("mongoose");
const { ObjectId } = require('mongodb');
const profileSchema = new mongoose.Schema({
username:{
    type:String,
    required:true
},
tagline:{
    type:String,
    required:true,
},
  postimage:{
    type:String,
    required:true
}

});

mongoose.model('Profile',profileSchema);

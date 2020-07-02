const mongoose = require("mongoose");
const { ObjectId } = require('mongodb');
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
}


});

mongoose.model('Polls',pollSchema);
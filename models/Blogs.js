const mongoose = require("mongoose");
const { ObjectId } = require('mongodb');
const blogSchema = new mongoose.Schema({
    username:{
        type:String,
        required:true,
        unique:true,
    },
    userpic:{
        type:String,
        required:true,
    },
    description:{
        type:String,
        required:true,
        minlength:5,
        maxlength:100,
    },
    date:{
        required:true,
        type:String,
    },
    postimage:{
        required:true,
        type:String
    },

});

mongoose.model('Blogs',blogSchema);


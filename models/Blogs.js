const mongoose = require("mongoose");
const { ObjectId } = require('mongodb');
const blogSchema = new mongoose.Schema({
    usn:{
        type:String,
      //  required:true,
        unique:true,
    },
    userpic:{
        type:String,
       // required:true,
    },
    description:{
        type:String,
        required:true,
        minlength:5,
        maxlength:100,
    },
    date:{
        required:true,
        type:Date,
    },
    postimage:{
        required:true,
        type:String
    },
    like_count:{
        type:Number,
    }
});

mongoose.model('Blogs',blogSchema);


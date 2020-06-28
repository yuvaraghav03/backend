const mongoose = require('mongoose')
const userSchema = new mongoose.Schema({
    usn:{
        type:String,
        unique:true,
        required:true,
    },
    pass:{
        type:String,
        required:true,
    },
    email:{
        type:String,
        required:true,
        unique:true,
    },
    num:{
        type:String,
        required:true,
        unique:true,
    },
    username:{
        type:String,
        required:true,
        unique:true,
    }
})

mongoose.model('user',userSchema);
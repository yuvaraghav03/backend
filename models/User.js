const mongoose = require('mongoose');
const bcrypt = require('bcrypt')
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
userSchema.pre('save',function(next){
    const user = this;
    if(!user.isModified('pass')){
        return next()
    }
    bcrypt.genSalt(10,(err,salt)=>{
        if(err){
            return next(err)
        }
     bcrypt.hash(user.pass,salt,(err,hash)=>{
         if(err){
             return next(err)
         }
         user.pass = hash;
         next()
     })

    })

})


userSchema.methods.comparePass = function(candidatePassword) {
    const user = this;
    return new Promise((resolve,reject)=>{
        bcrypt.compare(candidatePassword,user.pass,(err,isMatch)=>{
            if(err){
                return reject(err)
            }
            if (!isMatch){
                return reject(err)
            }
            resolve(true)
        })
    })

}


mongoose.model('User',userSchema);
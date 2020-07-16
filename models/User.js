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
    },
    followers:{
        type:String
    },
    following:{
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'User'
    },
    posts:{
        type:String,
    },
    polls:{
        type:String,
    },
    profilepic:{
        type:String,
    },
    tagline:{
        type:String,
    }
})
//profile
userSchema.methods.toProfileJSONFor = function(){
    return {
      username: this.username,
      tagline: this.tagline,
      profilepic: this.profilepic || 'https://static.productionready.io/images/smiley-cyrus.jpg',
      following: user ? user.isFollowing(this._id) : false
    };
  };
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
//following method
userSchema.methods.follow = function(id){
    if(this.following.indexOf(id) === -1){
      this.following.push(id);
    }
  
    return this.save();
  };
//unfollow method
userSchema.methods.unfollow = function(id){
    this.following.remove(id);
    return this.save();
  };
 //check if user is following or not
 userSchema.methods.isFollowing = function(id){
    return this.following.some(function(followId){
      return followId.toString() === id.toString();
    });
  }; 

mongoose.model('User',userSchema);
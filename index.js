const express = require('express')
const app = express()
const mongoose = require('mongoose')
var multer  = require('multer');
const PORT = 3001
const bodyParser = require('body-parser')
const {mongoUrl} = require('./keys');
var fs = require('fs'); 
require('./models/User');
require('./models/Blogs');
require('./models/Polls');
require('./models/Profile');
const requireToken =require('./middleware/requireToken')
const auth = require('./routes/auth');
const blogs = require('./routes/blogs');
const uploads = require('./routes/upload');
const profile = require('./routes/profile');
const polls = require('./routes/polls');
app.use(bodyParser.json(),bodyParser.urlencoded({
    extended:true
}))
app.use(auth);
app.use(blogs);
app.use(uploads);
app.use(profile);
app.use(polls);
app.use(polls);

  
  
mongoose.connect(mongoUrl,{
    useNewUrlParser:true,
    useUnifiedTopology:true
})

  
mongoose.connection.on('connected',()=>{
    console.log('connected to mongo db')
})
mongoose.connection.on('error',(err)=>{
    console.log('error connecting to database',err)
})
app.use(function (req, res, next) {
    res.status(404).send("Sorry you might be looking for something else")
  })
app.use(function (err, req, res, next) {
    console.error(err.stack)
    res.status(500).send('Something broke!')
  })
app.listen(PORT,()=>{
    console.log('server is running at port '+PORT)
})

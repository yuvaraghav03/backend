const express = require('express')
const app = express()
const mongoose = require('mongoose')
const multer = require('multer');
const PORT = 3001
const bodyParser = require('body-parser')
const {mongoUrl} = require('./keys');
require('./models/User');
require('./models/Blogs');
require('./models/Polls');
const requireToken =require('./middleware/requireToken')
const auth = require('./routes/auth');

const path = require('path');
const expresshandlebars = require('express-handlebars');
app.use(bodyParser.json(),bodyParser.urlencoded({
    extended:true
}))

app.use(auth)
app.set('followers',path.join(__dirname,"/followers/"));
mongoose.connect(mongoUrl,{
    useNewUrlParser:true,
    useUnifiedTopology:true,
})
mongoose.connection.on('connected',()=>{
    console.log('connected to mongo db')
})
mongoose.connection.on('error',(err)=>{
    console.log('error connecting to database',err)
})

app.listen(PORT,()=>{
    console.log('server is running at port '+PORT)
})
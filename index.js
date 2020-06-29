const express = require('express')
const app = express()
const mongoose = require('mongoose')

const PORT = 3001
const bodyParser = require('body-parser')
const {mongoUrl} = require('./keys')
require('./models/User');
const requireToken =require('./middleware/requireToken')
const auth = require('./routes/auth');

app.use(bodyParser.json())

app.use(auth)




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


app.get('/',requireToken,(req,res)=>{
    res.send('your usn is '+ req.user.usn)
})
app.listen(PORT,()=>{
    console.log('server is running at port '+PORT)
})
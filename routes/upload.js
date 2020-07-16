const mongoose = require("mongoose");
var express = require("express")
var bodyParser = require("body-parser");
var {ObjectID} = require('mongodb');
var multer  = require('multer')
const router = express.Router();
const Profile = mongoose.model('Profile');

const Storage = multer.diskStorage({
  destination(req, file, callback) {
    callback(null, './images')
  },
  filename(req, file, callback) {
    callback( `${file.fieldname}_${Date.now()}_${file.originalname}`)
  },
})

const upload = multer({ storage: Storage })
router.post('/uploads', upload.array('photo', 3), (req, res) => {
  console.log('file', req.files)
  console.log('body', req.body)
  res.status(200).json({
    message: 'success!',
  })
})

module.exports = router; 
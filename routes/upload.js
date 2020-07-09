const express = require('express')
const mongoose = require('mongoose')
const router = express.Router();
const multer = require('multer');
const Storage = multer.diskStorage({
    destination(req, file, callback) {
      callback(null, './images');
    },
    filename(req, file, callback) {
      callback(null, `${file.fieldname}_${Date.now()}_${file.originalname}`);
    },
    });
    
const upload = multer({ storage: Storage });
router.post('/uploads', upload.array('postimage'), (req, res) => {
  console.log('file', req.files);
  console.log('body', req.body);
  res.status(200).json({
    message: 'success!',
  });
});
module.exports = router;

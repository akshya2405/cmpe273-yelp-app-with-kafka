const path = require('path');
const multer = require('multer');

const res = require('express');

const destinationPath = 'images/uploads/';
let fileNameLocal = '';
const storage = multer.diskStorage({
  destination: '../Frontend/public/images/uploads/',
  filename: function(req, file, cb){
    fileNameLocal = "IMAGE-" + Date.now() + path.extname(file.originalname);
    cb(null,fileNameLocal);
  }
});

const upload = multer({
  storage: storage,
  limits: { fileSize: 100000000 },
}).single('myImage');

const uploadImage = (req) => new Promise((resolve, reject) => {
  setTimeout(() => {
    upload(req, res, (err) => {
      if (!err) {
        const result = { fileName: `${destinationPath}${fileNameLocal}` };
        console.log('Localfilename: ', fileNameLocal);
        resolve(result);
      }
    });
  }, 50);
});

exports.uploadImage = uploadImage;

const path = require("path");
const multer = require("multer");
const res = require('express');
const verifyToken = require('../middleware/authenticateToken');
const dbConnection = require('../dbConnection');
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
    // console.log('in actions : ');
    // console.log('Req : ', req.headers['x-access-token']);
    upload(req, res, (err) => {
      // console.log("Request ---", req.body);
      // console.log("Request file ---", req.file);//Here you get file.
      /* Now do where ever you want to do */
      if (!err) {
        const result = { fileName: `${destinationPath}${fileNameLocal}` };
        console.log('Localfilename: ', fileNameLocal);
        resolve(result);
      }
    });

    /* const custIDQuery = `SELECT customerID FROM customerprofile where email = '${token}';`;
                dbConnection.dbConn(custIDQuery)
                    .then((id) => {
                        // console.log(id[0].customerID);
      const registerQuery = `INSERT INTO eventregistration
       (customerID, eventID) VALUES (${id[0].customerID}, ${req.body.eventID})`;
                        // console.log(registerQuery);
                        dbConnection.dbConn(registerQuery)
       .then((output) => { // console.log('registered: ', output); resolve(output); })
                            .catch((err) => reject(err));
                    }); */
  }, 50);
});

exports.uploadImage = uploadImage;

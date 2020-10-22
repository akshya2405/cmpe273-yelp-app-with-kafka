const path = require("path");
const multer = require("multer");
const verifyToken = require('../middleware/authenticateToken');
const dbConnection = require('../dbConnection');
const res = require("express");
const destinationPath = './public/uploads/';
let fileNameLocal = '';
const storage = multer.diskStorage({
    destination: "../Frontend/public/images/uploads/",
    filename: function(req, file, cb){
        fileNameLocal = "IMAGE-" + Date.now() + path.extname(file.originalname);
        cb(null,fileNameLocal);
    }
});

const upload = multer({
    storage: storage,
    limits:{fileSize: 1000000},
}).single("myImage");

const uploadImage = (req) => new Promise((resolve, reject) => {
    setTimeout(() => {
        // console.log('in actions : ');
        // console.log('Req : ', req.headers['x-access-token']);
        verifyToken.verifyToken(req.headers['x-access-token'])
            .then((token) => {
                upload(req, res, (err) => {
                    // console.log("Request ---", req.body);
                    // console.log("Request file ---", req.file);//Here you get file.
                    /*Now do where ever you want to do*/
                    if(!err) {
                        const result = {fileName: fileNameLocal};
                        // console.log(fileNameLocal);
                        resolve(result);
                    }
                });

                /*const custIDQuery = `SELECT customerID FROM customerprofile where email = '${token}';`;
                dbConnection.dbConn(custIDQuery)
                    .then((id) => {
                        // console.log(id[0].customerID);
                        const registerQuery = `INSERT INTO eventregistration (customerID, eventID) VALUES (${id[0].customerID}, ${req.body.eventID})`;
                        // console.log(registerQuery);
                        dbConnection.dbConn(registerQuery)
                            .then((output) => { // console.log('registered: ', output); resolve(output); })
                            .catch((err) => reject(err));
                    });*/

            })
            .catch((err) => {
                // console.log(err);
                reject(err);
            });
    }, 50);
});

exports.uploadImage = uploadImage;

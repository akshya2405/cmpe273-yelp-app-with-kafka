/* eslint-disable linebreak-style */
const jwt = require('jsonwebtoken');
const config = require('../config/auth.config');

const verifyToken = (token) => new Promise((resolve, reject) => {
  setTimeout(() => {
    jwt.verify(token, config.secret, (err, decoded) => {
      if (err) {
        reject(err);
      }
      // console.log('Decoded id : ', typeof decoded.id);
      resolve(decoded.id);
    });
  }, 50);
});

exports.verifyToken = verifyToken;

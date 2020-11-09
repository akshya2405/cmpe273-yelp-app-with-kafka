const mongo = require('mongodb');
const { mongoDB } = require('../../Backend/config/auth.config');
const conn = require('../dbConnection');

function handle_get_messages(msg, db, callback) {
    let res ={};
    console.log('in get request get messages');
    const message = db.collection('messages');
    const findId = new mongo.ObjectID(msg.id);
    console.log('findId:', findId);
    if (msg.category === 'Restaurant') {
      message.find({ restId: findId }).toArray(function (error, messages) {
          if (error) {
              console.log(error);
              res.status = 500
              res.message = 'Error occurred';
              callback(null, res);
          }
          if (messages) {
              console.log('messages from db: ', messages);
              res.status = 200;
              res.messages = messages;
              callback(null, res);
          } else {
              console.log('in else');
              res.status = 401;
              res.message = 'Record not found';
              callback(null, res);
          }
      });
    } else {
      message.find({ custId: findId }).toArray(function (error, messages) {
        if (error) {
          console.log(error);
          res.status = 500
          res.message = 'Error occurred';
          callback(null, res);
        }
        if (messages) {
          console.log('messages from db: ', messages);
          res.status = 200;
          res.messages = messages;
          callback(null, res);
        } else {
          console.log('in else');
          res.status = 401;
          res.message = 'Record not found';
          callback(null, res);
        }
      });
    }
}

exports.handle_get_messages = handle_get_messages;
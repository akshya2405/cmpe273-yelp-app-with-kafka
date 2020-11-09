const mongo = require('mongodb');
const moment = require('moment');
// const { mongoDB } = require('../../Backend/config/auth.config');
const conn = require('../dbConnection');

// TODO: Edit this part with findOneAndUpdate
function handle_add_message(msg, db, callback) {
  let res = {};
  console.log('in post add message');
  const options = { returnOriginal: false }
  let messages = db.collection('messages');
  console.log(msg);
  if (msg.action === 'add') {
    const restId = new mongo.ObjectID(msg.restId);
    const custId = new mongo.ObjectID(msg.custId);
    const messageObj = {name: msg.name, timestamp: moment().format(), content: msg.content};
    let msgArray = [messageObj];
    const messageDetails = { _id: msg._id, custId, restId, messages: msgArray, closed: msg.closed };
    console.log(messageDetails);
  }
  messages.findOne({ _id: msg._id }, function (error, event) {
    if (error) {
      console.log(error);
      res.status = 500
      res.message = 'Error occurred';
      callback(null, res);
    }
    if (event) {
      console.log('event from db: ', event);
      if (msg.action === 'add') {
      messages.update({ _id: msg._id }, { $addToSet: { messages: messageObj } });
      } else {
        messages.update({ _id: msg._id }, {$set: {closed: msg.closed}});
      }
    } else {
      console.log('in else');
      messages.insert(messageDetails, function (err, dat) {
        if (err) {
          res.status = 500;
          callback(null, res);
        } else {
          console.log(dat.ops);
          res.status = 200;
          res.messages = dat.ops;
          callback(null, res);
        }
      });
    }
  })
}

exports.handle_add_message = handle_add_message;
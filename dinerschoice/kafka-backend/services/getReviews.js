const mongo = require('mongodb');
const { mongoDB } = require('../../Backend/config/auth.config');
const conn = require('../dbConnection');

function handle_get_reviews(msg, db, callback) {
  let res = {};
  console.log('in get request get reviews');
  const reviews = db.collection('reviews');
  const findId = new mongo.ObjectID(msg.id);
  console.log('findId:', findId);
  if (msg.category === 'Restaurant') {
    reviews.find({ restId: findId }).toArray(function (error, reviewList) {
      if (error) {
        console.log(error);
        res.status = 500
        res.message = 'Error occurred';
        callback(null, res);
      }
      if (reviewList) {
        console.log('reviews from db: ', reviewList);
        res.status = 200;
        res.reviews = reviewList;
        callback(null, res);
      } else {
        console.log('in else');
        res.status = 401;
        res.message = 'Record not found';
        callback(null, res);
      }
    });
  } else {
    reviews.find({ custId: findId }).toArray(function (error, reviewList) {
      if (error) {
        console.log(error);
        res.status = 500
        res.message = 'Error occurred';
        callback(null, res);
      }
      if (reviewList) {
        console.log('messages from db: ', reviewList);
        res.status = 200;
        res.reviews = reviewList;
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

exports.handle_get_reviews = handle_get_reviews;
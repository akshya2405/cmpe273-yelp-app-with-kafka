const mongo = require('mongodb');
const moment = require('moment');
// const { mongoDB } = require('../../Backend/config/auth.config');
const conn = require('../dbConnection');

// TODO: Edit this part with findOneAndUpdate
function handle_add_review(msg, db, callback) {
  let res = {};
  console.log('in post add review');
  const options = { returnOriginal: false }
  let reviews = db.collection('reviews');
  console.log(msg);
  const restId = new mongo.ObjectID(msg.restId);
  const custId = new mongo.ObjectID(msg.custId);
  const {totalRating, reviewCount, restID, custID, ...details} = msg;
  const forProfile = { $set: {totalRating: totalRating, reviewCount: reviewCount} }
  const review = {restId, custId, ...details};
  console.log(review);

  db.collection('restaurantProfile').findOneAndUpdate({ id: restId }, forProfile, options, function (error, event) {
    if (error) {
      console.log(error);
      res.status = 500
      res.message = 'Error occurred';
      callback(null, res);
    }
    if (event) {
      console.log('event from db: ', event);
    } else {
      console.log('in else');
    }
  });
  
  reviews.insert(review, function (err, dat) {
    if (err) {
      res.status = 500;
      callback(null, res);
    } else {
      console.log(dat.ops);
      res.status = 200;
      res.reviews = dat.ops;
      callback(null, res);
    }
  });
}

exports.handle_add_review = handle_add_review;
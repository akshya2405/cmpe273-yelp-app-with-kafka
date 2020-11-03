const mongo = require('mongodb');
const { mongoDB } = require('../../Backend/config/auth.config');
const conn = require('../dbConnection');

function handle_profile(msg, db, callback) {
  let res ={};
  console.log('in get request restaurant profile');
    // conn.conn().then((db) => {
          console.log('connected to db');
          const restaurantProfile = db.collection('restaurantProfile');
          const findId = new mongo.ObjectID(msg.id);
          console.log('findId:', findId);
          let profile = {};
          restaurantProfile.findOne({ id: findId }, function (error, result) {
              if (error) {
                  console.log(error);
                  res.status = 500
                  res.message = 'Error occurred';
                  callback(null, res);
              }
              if (result) {
                  let menu = [];
                  profile = {profile: result};
                console.log(JSON.stringify(result));
                const reviewsCollection = db.collection('reviews');
                console.log('checking reviews');
                db.collection('menu').find( { restId: findId }).toArray(function (error, menu) {
                      if (error) {
                          console.log(error);
                          res.status = 500
                          res.message = 'Error occurred';
                          callback(null, res);
                      }
                      if (menu) {
                          menu = menu;
                          console.log(JSON.stringify(menu));
                          Object.assign(profile, {dishes: menu});
                          console.log(JSON.stringify(profile));
                      }
                  });
                let reviews = [];
                reviewsCollection.find( { id: findId }).toArray(function (error, reviews) {
                    console.log('finding reviews');
                    if (error) {
                        console.log(error);
                        res.status = 500
                        res.message = 'Error occurred';
                        callback(null, res);
                    }
                    if (reviews) {
                        reviews = reviews;
                        Object.assign(profile, {reviews: reviews});
                        console.log(JSON.stringify(profile));
                        callback(null, profile);
                    } else {
                        callback(null, profile);
                    }
                });
              } else {
                  console.log('in else');
                  res.status = 401;
                  res.message = 'Record not found';
                  callback(null, res);
              }
          });
  // });
}

exports.handle_profile = handle_profile;
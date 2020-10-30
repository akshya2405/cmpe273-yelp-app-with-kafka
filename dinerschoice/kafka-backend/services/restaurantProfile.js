const mongo = require('mongodb');
const { mongoDB } = require('../../Backend/config/auth.config');

function handle_profile(msg, callback) {
  let res ={};
  console.log('in get request restaurant profile');
  mongo.connect(mongoDB,function (err, db){
      if (err) {
          callback(null, 'Cannot connect to db');
      } else {
          console.log('connected to db');
          const restaurantProfile = db.collection('restaurantProfile');
          const findId = new mongo.ObjectID(msg.id);
          console.log('findId:', findId);
          restaurantProfile.findOne({ id: findId }, function (error, result) {
              if (error) {
                  console.log(error);
                  res.status = 500
                  res.message = 'Error occurred';
                  callback(null, res);
              }
              if (result) {
                console.log(JSON.stringify(result));
                const reviews = db.collection('reviews');
                console.log('checking reviews');
                reviews.find( { id: findId }).toArray(function (error, reviews) {
                    console.log('finding reviews');
                    if (error) {
                        console.log(error);
                        res.status = 500
                        res.message = 'Error occurred';
                        callback(null, res);
                    }
                    if (reviews) {
                        const profile = {profile: result, reviews: reviews}
                        console.log(JSON.stringify(profile));
                        callback(null, profile);
                    } else {
                        const profile = {profile: result};
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
      }
  });
}

exports.handle_profile = handle_profile;
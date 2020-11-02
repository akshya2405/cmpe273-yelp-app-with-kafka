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
          let profile = {};
          restaurantProfile.findOne({ id: findId }, function (error, result) {
              if (error) {
                  console.log(error);
                  res.status = 500
                  res.message = 'Error occurred';
                  db.close();
                  callback(null, res);
              }
              if (result) {
                  let menu = [];
                console.log(JSON.stringify(result));
                const reviews = db.collection('reviews');
                console.log('checking reviews');
                db.collection('menu').find( { restId: findId }).toArray(function (error, menu) {
                      if (error) {
                          console.log(error);
                          res.status = 500
                          res.message = 'Error occurred';
                          db.close();
                          callback(null, res);
                      }
                      if (menu) {
                          menu = menu;
                          console.log(JSON.stringify(menu));
                      }
                  });
                reviews.find( { id: findId }).toArray(function (error, reviews) {
                    console.log('finding reviews');
                    if (error) {
                        console.log(error);
                        res.status = 500
                        res.message = 'Error occurred';
                        db.close();
                        callback(null, res);
                    }
                    if (reviews) {
                        const profile = {profile: result, dishes: menu, reviews: reviews}
                        console.log(JSON.stringify(profile));
                        db.close();
                        callback(null, profile);
                    } else {
                        const profile = {profile: result, dishes: menu};
                        db.close();
                        callback(null, profile);
                    }
                });
              } else {
                  console.log('in else');
                  res.status = 401;
                  res.message = 'Record not found';
                  db.close();
                  callback(null, res);
              }
          });
      }
  });
}

exports.handle_profile = handle_profile;
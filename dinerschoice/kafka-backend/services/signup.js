const Users = require('./Models/UserModel');
const Customer = require('./Models/CustomerProfileModel');
const Restaurant = require('./Models/RestaurantProfileModel');
const mongo = require('mongodb');
const { mongoDB } = require('../../Backend/config/auth.config');

function handle_signup(msg, callback) {
  let res = {};
  const newUser = {
    category: msg.category,
    email: msg.email,
    password: msg.password,
  };

  console.log('in signup backend : ', newUser);
  mongo.connect(mongoDB, function(err, db) {
    if (err) {
      callback(null, 'cannot connect to db');
    } else {
      console.log('Connected to db');
      const users = db.collection('users');
      users.insert(newUser, function (error, data) {
        if (error) {
          console.log(error);
          res.status = 500;
          callback(null, res);
        } else {
          console.log(data);
          let profile = {};
          let collection = '';
          if (msg.category === 'Restaurant') {
            profile = {
              name: msg.name,
              email: msg.email,
              streetAddress: msg.streetAddress,
              city: msg.city,
              state: msg.state,
              country: msg.country,
              zipcode: msg.zipcode,
            };
            console.log(profile);
            collection = db.collection('restaurantProfile');
          } else {
            profile = {
              fname: msg.fname,
              lname: msg.lname,
              email: msg.email,
            };
            collection = db.collection('customerProfiles');
          }
          collection.insert(profile, function (err, dat) {
            if (err) {
              res.status = 500;
              callback(null, res);
            } else {
              console.log(dat);
              res.status = 200;
                callback(null, res);
            }
          });
        }
    });
    }
  })
}

exports.handle_signup = handle_signup;

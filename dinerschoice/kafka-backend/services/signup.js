const Users = require('./Models/UserModel');
const Customer = require('./Models/CustomerProfileModel');
const Restaurant = require('./Models/RestaurantProfileModel');
const mongo = require('mongodb');
const { mongoDB } = require('../../Backend/config/auth.config');
const conn = require('../dbConnection');

function handle_signup(msg, db, callback) {
  let res = {};
  const newUser = {
    category: msg.category,
    email: msg.email,
    password: msg.password,
  };

  console.log('in signup backend : ', newUser);
  // conn.conn().then((db) => {
      console.log('Connected to db');
      const users = db.collection('users');
      users.insertOne(newUser, function (error, data) {
        if (error) {
          console.log(error);
          res.status = 500;
          callback(null, res);
        } else {
          console.log(data);
          const insertId = new mongo.ObjectID(data["ops"][0]["_id"]);
          let profile = {};
          let collection = '';
          if (msg.category === 'Restaurant') {
            profile = {
              id: insertId,
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
              db.close();
              callback(null, res);
            } else {
              console.log(dat);
              res.status = 200;
              callback(null, res);
            }
          });
        }
    });
  // });
}

exports.handle_signup = handle_signup;

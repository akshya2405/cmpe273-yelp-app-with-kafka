const mongo = require('mongodb');
const { mongoDB } = require('../../Backend/config/auth.config');
const conn = require('../dbConnection');

// TODO: Edit this part with findOneAndUpdate
function handle_edit_profile(msg, db, callback) {
  let res ={};
  console.log('in get request restaurant profile');
    // conn.conn().then((db) => {
        console.log('connected to db');
        const options = { returnOriginal: false }
        let collectionName = '';
        const { id, category, ...details } = msg;
        const findId = new mongo.ObjectID(id);
        console.log(findId);
        if(category === 'Restaurant') {
          collectionName = db.collection('restaurantProfile');
        } else {
          collectionName = db.collection('customerProfiles');
        }
        collectionName.findOneAndUpdate({ id: findId },
            {$set: details}, options, function (error, result) {
            if (error) {
                console.log(error);
                res.status = 500
                res.message = 'Error occurred';
                callback(null, res);
            }
            if (result) {
              console.log(JSON.stringify(result.value));
              res.status = 200;
              res.profile = result.value;
              callback(null, res);
            } else {
              console.log('in else');
              res.status = 401;
              res.message = 'Record not found';
              callback(null, res);
            }
        });
  // });
}

exports.handle_edit_profile = handle_edit_profile;
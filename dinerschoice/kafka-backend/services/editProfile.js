const mongo = require('mongodb');
const { mongoDB } = require('../../Backend/config/auth.config');

// TODO: Edit this part with findOneAndUpdate
function handle_edit_profile(msg, callback) {
  let res ={};
  console.log('in get request restaurant profile');
  mongo.connect(mongoDB,function (err, db){
      if (err) {
          callback(null, 'Cannot connect to db');
      } else {
        console.log('connected to db');
        const options = { returnOriginal: false }
        let collectionName = '';
        const { id, category, ...details } = msg;
        const findId = new mongo.ObjectID(id);
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
                db.close();
                callback(null, res);
            }
            if (result) {
              console.log(JSON.stringify(result.value));
              res.status = 200;
              res.profile = result.value;
              db.close();
              callback(null, res);
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

exports.handle_edit_profile = handle_edit_profile;
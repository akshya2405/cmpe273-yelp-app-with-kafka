const mongo = require('mongodb');
const moment = require('moment');

// TODO: Edit this part with findOneAndUpdate
function handle_update_order(msg, db, callback) {
    let res ={};
    console.log('in post request place order');
    const options = { returnOriginal: false }
    let collectionName = db.collection('orders');
    findId = new mongo.ObjectID(msg._id);
    const updateDetails = {
        $set: {
            orderStatus: msg.orderStatus,
            deliveryStatus: msg.deliveryStatus
        }
    };
    console.log(updateDetails);
    collectionName.update({_id: findId}, updateDetails, options, function (err, dat) {
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

exports.handle_update_order = handle_update_order;
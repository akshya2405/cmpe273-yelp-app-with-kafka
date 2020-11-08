const mongo = require('mongodb');
const { mongoDB } = require('../../Backend/config/auth.config');
const conn = require('../dbConnection');

function handle_profile(msg, db, callback) {
    let res ={};
    console.log('in get request restaurant profile');
    // conn.conn().then((db) => {
    // console.log('connected to db');
    const customerProfile = db.collection('customerProfiles');
    const findId = new mongo.ObjectID(msg.id);
    console.log('findId:', findId);
    customerProfile.findOne({ id: findId }, function (error, profile) {
        if (error) {
            console.log(error);
            res.status = 500
            res.message = 'Error occurred';
            callback(null, res);
        }
        if (profile) {
            console.log('profile from db: ', profile);
            res.status = 200;
            res.profile = profile;
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

exports.handle_profile = handle_profile;
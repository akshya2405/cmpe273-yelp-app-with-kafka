const mongo = require('mongodb');
const { mongoDB } = require('../../Backend/config/auth.config');
const conn = require('../dbConnection');

function handle_rest_events(msg, db, callback) {
    let res ={};
    console.log('in get request restaurant events');
    const events = db.collection('events');
    const findId = new mongo.ObjectID(msg.id);
    console.log('findId:', findId);
    events.find({ restId: findId }).toArray(function (error, result) {
        if (error) {
            console.log(error);
            res.status = 500
            res.message = 'Error occurred';
            callback(null, res);
        }
        if (result) {
            console.log(JSON.stringify(result));
            res.status = 200;
            res.events = result;
            callback(null, res);
        } else {
            console.log('in else');
            res.status = 401;
            res.message = 'Record not found';
            callback(null, res);
        }
    });
}

exports.handle_rest_events = handle_rest_events;
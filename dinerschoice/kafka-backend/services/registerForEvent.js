const mongo = require('mongodb');
const moment = require('moment');
// const { mongoDB } = require('../../Backend/config/auth.config');
const conn = require('../dbConnection');

// TODO: Edit this part with findOneAndUpdate
function handle_register_for_event(msg, db, callback) {
    let res ={};
    console.log('in post request register for event');
    const options = { returnOriginal: false }
    let profile = db.collection('customerProfiles');
    let register = db.collection('registrationList');
    // console.log(msg);
    let { event, regList } = msg;
    eventId = event._id;
    restId = new mongo.ObjectID(event.restID);
    custId = new mongo.ObjectID(regList.id);
    let regArray = [];
    regArray.push(regList);
    const registerDetails = {eventId: eventId, restId, regList: regArray};
    console.log(registerDetails);
    register.findOne({_id: eventId}, function (error, event) {
        if (error) {
            console.log(error);
            res.status = 500
            res.message = 'Error occurred';
            callback(null, res);
        }
        if (event) {
            console.log('event from db: ', event);
            register.update({eventId: eventId}, { $addToSet: {regList: regList}});
            profile.update({id: custId}, {$addToSet: {registeredEvents: eventId}});
        } else {
            console.log('in else');
            register.insert(registerDetails, function (err, dat) {
                if (err) {
                    res.status = 500;
                    callback(null, res);
                } else {
                    console.log(dat);
                    res.status = 200;
                    // callback(null, res);
                }
            });
            profile.findOneAndUpdate({id: custId}, {$addToSet: {registeredEvents: eventId}}, options, function(err, result) {
                if (err) {
                    res.status = 500;
                    callback(null, res);
                } else {
                    console.log('insert output: ', result.value);
                    res.status = 200;
                    res.cust_profile = result.value;
                    callback(null, res);
                }
            });
        }
    })
}

exports.handle_register_for_event = handle_register_for_event;
const mongo = require('mongodb');
const { mongoDB } = require('../../Backend/config/auth.config');
const conn = require('../dbConnection');

function handle_get_events(msg, db, callback) {
    let res ={};
    console.log('in get request restaurant events');
    const events = db.collection('events');
    const regList = db.collection('registrationList');
    const findId = new mongo.ObjectID(msg.id);
    console.log('findId:', findId);
    let results = [];
    let allEvents = [];
    let registeredEvents = [];
    if (msg.category === 'Restaurant') {
        events.find({ restId: findId }).toArray(function (error, result) {
            if (error) {
                console.log(error);
                res.status = 500
                res.message = 'Error occurred';
                callback(null, res);
            }
            if (result) {
                console.log(JSON.stringify(result));
                regList.find({ restId: findId }).toArray(function (error, list) {
                    if (error) {
                        console.log(error);
                        res.status = 500
                        res.message = 'Error occurred';
                        callback(null, res);
                    }
                    if (list) {
                        console.log(JSON.stringify(list));
                        res.status = 200;
                        result.map((evt) => {
                            item = list.find(item => item.eventId === evt._id);
                            
                            if (item) {
                                custList = item.regList;
                                evtObj = {...evt, registrationList: custList};
                                results.push(evtObj);
                            } else {
                                custList = [];
                                evtObj = {...evt, registrationList: custList};
                                results.push(evtObj);
                            }
                        });
                        console.log('results: ', results);
                        res.status = 200;
                        res.events = results;
                        callback(null, res)
                    }
                });
            } else {
                console.log('in else');
                res.status = 401;
                res.message = 'Record not found';
                callback(null, res);
            }
        });
    } else {
        let find_ids = [];
        (msg.ids).map((id) => {
            find_ids.push(id);
        })
        console.log('find_ids: ', find_ids);
        events.find({ _id: {$in: find_ids } }).toArray(function (error, result) {
            if (error) {
                console.log(error);
                res.status = 500
                res.message = 'Error occurred';
                callback(null, res);
            }
            if (result) {
                console.log('registered list:', JSON.stringify(result));
                registeredEvents = result;
                events.find({ date : { $gte : new Date() } }).toArray(function (error, result) {
                    if (error) {
                        console.log(error);
                        res.status = 500
                        res.message = 'Error occurred';
                        callback(null, res);
                    }
                    if (result) {
                        console.log(JSON.stringify(result));
                        allEvents = result;
                        res.status = 200;
                        res.events = {registeredEvents, allEvents};
                        console.log('sending out', JSON.stringify(res.events));
                        callback(null, res);
                    } else {
                        console.log('in else');
                        res.status = 401;
                        res.message = 'Record not found';
                        callback(null, res);
                    }
                });
            } else {
                console.log('in else');
                res.status = 401;
                res.message = 'Record not found';
                // callback(null, res);
            }
        });
    }
}

exports.handle_get_events = handle_get_events;
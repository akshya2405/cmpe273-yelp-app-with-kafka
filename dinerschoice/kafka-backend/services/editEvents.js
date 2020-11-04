const mongo = require('mongodb');
const { mongoDB } = require('../../Backend/config/auth.config');
const conn = require('../dbConnection');

function handle_edit_events(msg, db, callback) {
    let res ={};
    console.log('in post request restaurant events');
    console.log('connected to db');
    const options = { returnOriginal: false, upsert: true }
    let collectionName = '';
    console.log(msg);
    const { id, updateList, deleteIds } = msg;
    const findrestId = new mongo.ObjectID(id);
    collectionName = db.collection('events');
    console.log('delete ids: ', deleteIds);
    let deleteList = [];
    deleteIds.map((id) => {
        if (id.length === 24) {
            deleteList.push(new mongo.ObjectID(id));
        } else {
            deleteList.push(id);
        }
    });
    console.log(deleteList);
    console.log(JSON.stringify(updateList));
    collectionName.deleteMany({_id : {$in: deleteList}});
    let update = {};
    updateList.map((event) => {
        update = {$set: {
                restId: findrestId,
                name: event.name,
                date: event.date,
                description: event.description,
                location: event.location,
                time: event.time,
                hashtags: event.hashtags,
                registrationList: event.registrationList,
            }};
        console.log(event._id);
        let eventID = event._id;
        if (event._id.length === 24) {
            eventID = new mongo.ObjectID(event._id);
        }
        collectionName.findOneAndUpdate({_id: eventID}, update, options);
    });
        collectionName.find({restId: findrestId}).toArray(function (error, events) {
            if (error) {
                console.log(error);
                res.status = 500;
                res.message = 'Error occurred';
                callback(null, res);
            }
            if (events) {
                console.log(JSON.stringify(events));
                res.status = 200;
                res.events = events
                callback(null, res);
            }
        });
}

exports.handle_edit_events = handle_edit_events;
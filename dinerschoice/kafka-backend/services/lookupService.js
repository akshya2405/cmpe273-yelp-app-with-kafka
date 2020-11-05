const mongo = require('mongodb');
const { mongoDB } = require('../../Backend/config/auth.config');
const conn = require('../dbConnection');

function handle_lookup(msg, db, callback) {
    let res ={};
    console.log('in get request restaurant profile');
    // conn.conn().then((db) => {
    console.log('msg: ', msg);
    const searchToken = msg.searchToken;
    const restaurantProfile = db.collection('restaurantProfile');
    const menu = db.collection('menu');
    let lookupResults = [];
    if (searchToken) {
        restaurantProfile.find({
            "$or": [{
                "name": '/' + searchToken + '/'
            }, {
                "$or": [{
                    "cuisine ": '/' + searchToken + '/'
                }, {
                    "$or": [{
                        "mode ": '/' + searchToken + '/'
                    }, {
                        "$or": [{
                            "city ": '/' + searchToken + '/'
                        }, {
                            "$or": [{
                                "state ": '/' + searchToken + '/'
                            }]
                        }]
                    }]
                }]
            }]
        }).toArray(function (error, results) {
            console.log('finding');
            if (error) {
                console.log(error);
                // res.status = 500
                // res.message = 'Error occurred';
                // callback(null, res);
            }
            if (results) {
                console.log(results);
                // Object.assign(profile, {reviews: reviews});
                // console.log(JSON.stringify(profile));
                // callback(null, profile);
            } else {
                console.log("cannot find any");
                // callback(null, profile);
            }
        });
    } else {
        restaurantProfile.find().toArray(function (error, results) {
            console.log('finding');
            if (error) {
                console.log(error);
                res.status = 500
                res.message = 'Error occurred';
                callback(null, res);
            }
            if (results) {
                console.log(results);
                // Object.assign(profile, {reviews: reviews});
                // console.log(JSON.stringify(profile));
                callback(null, results);
            } else {
                console.log("cannot find any");
                // callback(null, profile);
            }
        })
    }
}

exports.handle_lookup = handle_lookup;
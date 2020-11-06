const mongo = require('mongodb');
const moment = require('moment');
// const { mongoDB } = require('../../Backend/config/auth.config');
const conn = require('../dbConnection');

// TODO: Edit this part with findOneAndUpdate
function handle_place_order(msg, db, callback) {
    let res ={};
    console.log('in post request place order');
    // conn.conn().then((db) => {
    // console.log('connected to db');
    const options = { returnOriginal: false }
    let collectionName = db.collection('orders');
    // console.log(msg);
    let { restID, custID, ...details } = msg;
    restID = new mongo.ObjectID(restID);
    custID = new mongo.ObjectID(custID);
    const orderDateTime = moment(Date.now()).format('YYYY-MM-DD HH:mm:ss');
    const insertDetails = {restID, custID, ...details, dateTime: orderDateTime};
    console.log(insertDetails);
    collectionName.insert(insertDetails, function (err, dat) {
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

exports.handle_place_order = handle_place_order;
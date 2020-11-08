const mongo = require('mongodb');

function handle_rest_orders(msg, db, callback) {
    let res ={};
    console.log('in get request restaurant orders');
    const orders = db.collection('orders');
    console.log('category: ', msg.category, ' id: ', msg.id);
    const findId = new mongo.ObjectID(msg.id);
    console.log('findId:', findId);
    if (msg.category === 'Restaurant') {
        orders.find({ restID: findId }).toArray(function (error, result) {
            if (error) {
                console.log(error);
                res.status = 500
                res.message = 'Error occurred';
                callback(null, res);
            }
            if (result) {
                console.log(JSON.stringify(result));
                res.status = 200;
                res.orders = result;
                callback(null, res);
            } else {
                console.log('in else');
                res.status = 401;
                res.message = 'Record not found';
                callback(null, res);
            }
        });
    } else {
        orders.find({ custID: findId }).toArray(function (error, result) {
            if (error) {
                console.log(error);
                res.status = 500
                res.message = 'Error occurred';
                callback(null, res);
            }
            if (result) {
                console.log(JSON.stringify(result));
                res.status = 200;
                res.orders = result;
                callback(null, res);
            } else {
                console.log('in else');
                res.status = 401;
                res.message = 'Record not found';
                callback(null, res);
            }
        });
    }
}

exports.handle_rest_orders = handle_rest_orders;
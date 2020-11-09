const moment = require('moment');
const verifyToken = require('../middleware/authenticateToken');
const dbConnection = require('../dbConnection');

const updateOrderStatus = (req) => new Promise((resolve, reject) => {
  setTimeout(() => {
    // console.log('in actions : ');
    // console.log('Req : ', req.headers['x-access-token']);
    verifyToken.verifyToken(req.headers['x-access-token'])
      .then(() => {
        const orderQuery = `UPDATE orders 
                            SET orderStatus = '${req.body.order.orderStatus}',
                            deliveryStatus = '${req.body.order.deliveryStatus}'
                            WHERE orderID = ${req.body.order.orderID};`;
        // console.log('order query: ', orderQuery);
        dbConnection.dbConn(orderQuery)
          .then((output) => {
            resolve(output);
          });
      })
      .catch((err) => {
        // console.log(err);
        reject(err);
      });
  }, 50);
});

exports.updateOrderStatus = updateOrderStatus;

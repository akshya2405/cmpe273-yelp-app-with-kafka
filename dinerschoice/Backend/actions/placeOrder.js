const moment = require('moment');
const verifyToken = require('../middleware/authenticateToken');
const dbConnection = require('../dbConnection');

const placeOrder = (req) => new Promise((resolve, reject) => {
  setTimeout(() => {
    // console.log('in actions : ');
    // console.log('Req : ', req.headers['x-access-token']);
    verifyToken.verifyToken(req.headers['x-access-token'])
      .then((token) => {
        const custIDQuery = `SELECT customerID FROM customerprofile where email = '${token}';`;
        dbConnection.dbConn(custIDQuery)
          .then((id) => {
            // console.log(id[0].customerID);
            const orderDateTime = moment(Date.now()).format('YYYY-MM-DD HH:mm:ss');
            // console.log(orderDateTime);
            const orderQuery = `INSERT INTO orders (customerID, restaurantID, dateTime, orderStatus, deliveryType, deliveryStatus, orderTotalPrice) VALUES 
                                (${id[0].customerID}, ${req.body.order.restID}, '${orderDateTime}', '${req.body.order.orderStatus}',
                                 '${req.body.order.deliveryType}', '${req.body.order.deliveryStatus}', ${req.body.order.total});`;
            // console.log('order query: ', orderQuery);
            dbConnection.dbConn(orderQuery)
              .then((output) => {
                // console.log(output);
                const orderID = output.insertId;
                // console.log('orderid: ', orderID);
                const orderItemsQuery = `INSERT INTO orderitems (orderID, dishID, quantity, price) VALUES (${orderID}, `;
                const orderItems = JSON.parse(req.body.order.items);
                orderItems.map((item) => {
                  const newQuery = `${orderItemsQuery}${item.dishID}, ${item.quantity}, ${item.price});`;
                  dbConnection.dbConn(newQuery)
                    .then(() => {});
                });
                resolve(output);
              });
          });
      })
      .catch((err) => {
        // console.log(err);
        reject(err);
      });
  }, 50);
});

exports.placeOrder = placeOrder;

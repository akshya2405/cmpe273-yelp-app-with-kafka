const verifyToken = require('../middleware/authenticateToken');
const dbConnection = require('../dbConnection');

const getCustomerOrders = (req) => new Promise((resolve, reject) => {
  setTimeout(() => {
    // console.log('in actions : ');
    // console.log('Req : ', req.headers['x-access-token']);
    verifyToken.verifyToken(req.headers['x-access-token'])
      .then((token) => {
        const custIDquery = `SELECT customerID FROM customerprofile where email = '${token}';`;
        dbConnection.dbConn(custIDquery)
          .then((custID) => {
            // console.log(custID[0].customerID);
            const query = `SELECT * FROM orders_view where customerID = '${custID[0].customerID}';`;
            // console.log(query);
            dbConnection.dbConn(query)
              .then((output) => {
                const orderids = [];
                output.forEach((val) => {
                  orderids.push(val.orderID);
                });
                // console.log(orderids);
                if (orderids.length === 0) {
                  resolve([]);
                }
                const orderItemquery = `SELECT * FROM orderitems_view WHERE orderID IN (${orderids.join(',')})`;
                // console.log(orderItemquery);
                dbConnection.dbConn(orderItemquery)
                  .then((result) => {
                    // console.log(result);
                    const finaloutput = { orders: output, orderItems: result };
                    // console.log(finaloutput);
                    resolve(finaloutput);
                  })
                  .catch((err) => {
                    reject(err);
                  });
              })
              .catch((err) => {
                reject(err);
              });
          })
          .catch((err) => {
            reject(err);
          });
      })
      .catch((err) => {
        // console.log(err);
        reject(err);
      });
  }, 1000);
});

exports.getCustomerOrders = getCustomerOrders;

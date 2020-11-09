const verifyToken = require('../middleware/authenticateToken');
const dbConnection = require('../dbConnection');

const getRestaurantOrders = (req) => new Promise((resolve, reject) => {
  setTimeout(() => {
    // console.log('in actions : ');
    // console.log('Req : ', req.headers['x-access-token']);
    verifyToken.verifyToken(req.headers['x-access-token'])
      .then((token) => {
        const restIDquery = `SELECT restaurantID FROM restaurantprofile where email = '${token}';`;
        dbConnection.dbConn(restIDquery)
          .then((restID) => {
            // console.log(restID[0].restaurantID);
            const query = `SELECT * FROM orders_view where restaurantID = '${restID[0].restaurantID}';`;
            // console.log(query);
            dbConnection.dbConn(query)
              .then((output) => {
                const orderids = [];
                output.forEach((val) => {
                  orderids.push(val.orderID);
                });
                // console.log(orderids);
                if (orderids.length === 0) {
                  // console.log('no orders resolving');
                  resolve([]);
                }
                const orderItemquery = `SELECT * FROM orderitems_view WHERE orderID IN (${orderids.join(',')})`;
                // console.log(orderItemquery);
                dbConnection.dbConn(orderItemquery)
                  .then((result) => {
                    // console.log(result);
                    const finaloutput = { orders: output, orderItems: result };
                    // console.log(finaloutput);
                    resolve('final output:', finaloutput);
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

exports.getRestaurantOrders = getRestaurantOrders;

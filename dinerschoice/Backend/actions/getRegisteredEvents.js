const verifyToken = require('../middleware/authenticateToken');
const dbConnection = require('../dbConnection');

const getRegisteredEvents = (req) => new Promise((resolve, reject) => {
  setTimeout(() => {
    // console.log('in actions : ');
    // console.log('Req : ', req.headers['x-access-token']);
    verifyToken.verifyToken(req.headers['x-access-token'])
      .then((token) => {
        const custIDquery = `SELECT customerID FROM customerprofile where email = '${token}';`;
        dbConnection.dbConn(custIDquery)
          .then((custID) => {
            // console.log(custID[0].customerID);
            const query = `SELECT eventID FROM eventregistration where customerID = '${custID[0].customerID}';`;
            // console.log(query);
            dbConnection.dbConn(query)
              .then((output) => {
                const eventids = [];
                output.forEach((val) => {
                  eventids.push(val.eventID);
                });
                // console.log(eventids);
                if (eventids.length === 0) {
                  resolve([]);
                }
                const eventquery = `SELECT * FROM events WHERE eventID IN (${eventids.join(',')})`;
                // console.log(eventquery);
                dbConnection.dbConn(eventquery)
                  .then((result) => {
                    // console.log(result);
                    resolve(result);
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

exports.getRegisteredEvents = getRegisteredEvents;

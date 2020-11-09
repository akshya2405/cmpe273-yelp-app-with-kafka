const verifyToken = require('../middleware/authenticateToken');
const dbConnection = require('../dbConnection');

const getCustReviews = (req) => new Promise((resolve, reject) => {
  setTimeout(() => {
    // console.log('in actions : ');
    // console.log('Req : ', req.headers['x-access-token']);
    // console.log('verified: ', req.body);
    verifyToken.verifyToken(req.headers['x-access-token'])
      .then((token) => {
        const custIDquery = `SELECT * FROM customerprofile where email = '${token}';`;
        dbConnection.dbConn(custIDquery)
          .then((id) => {
            const query = `SELECT * FROM review_view where customerID = '${id[0].customerID}';`;
            // console.log(query);
            dbConnection.dbConn(query)
              .then((output) => {
                // console.log(output);
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

exports.getCustReviews = getCustReviews;

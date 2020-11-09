const verifyToken = require('../middleware/authenticateToken');
const dbConnection = require('../dbConnection');

const customerProfile = (req) => new Promise((resolve, reject) => {
  setTimeout(() => {
    // console.log('in actions : ');
    // console.log('Req : ', req.headers['x-access-token']);
    verifyToken.verifyToken(req.headers['x-access-token'])
      .then((token) => {
        if (req.query.custID === undefined) {
          const query = `SELECT * FROM customerprofile where email = '${token}';`;
          // console.log(query);
          dbConnection.dbConn(query)
            .then((output) => resolve(output));
        } else {
          const query = `SELECT * FROM customerprofile where customerID = '${req.query.custID}';`;
          // console.log(query);
          dbConnection.dbConn(query)
            .then((output) => resolve(output));
        }
      })
      .catch((err) => {
        // console.log(err);
        reject(err);
      });
  }, 50);
});

exports.customerProfile = customerProfile;

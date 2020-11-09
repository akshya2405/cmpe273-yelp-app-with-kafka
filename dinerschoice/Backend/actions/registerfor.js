const verifyToken = require('../middleware/authenticateToken');
const dbConnection = require('../dbConnection');

const registerfor = (req) => new Promise((resolve, reject) => {
  setTimeout(() => {
    // console.log('in actions : ');
    // console.log('Req : ', req.headers['x-access-token']);
    verifyToken.verifyToken(req.headers['x-access-token'])
      .then((token) => {
        // console.log('update list : ', req.body.eventID);
        const custIDQuery = `SELECT customerID FROM customerprofile where email = '${token}';`;
        dbConnection.dbConn(custIDQuery)
          .then((id) => {
            // console.log(id[0].customerID);
            const registerQuery = `INSERT INTO eventregistration (customerID, eventID) VALUES (${id[0].customerID}, ${req.body.eventID})`;
            // console.log(registerQuery);
            dbConnection.dbConn(registerQuery)
              .then((output) => {
                  // console.log('registered: ', output);
                  resolve(output); })
              .catch((err) => reject(err));
          });
        resolve();
      })
      .catch((err) => {
        // console.log(err);
        reject(err);
      });
  }, 50);
});

exports.registerfor = registerfor;

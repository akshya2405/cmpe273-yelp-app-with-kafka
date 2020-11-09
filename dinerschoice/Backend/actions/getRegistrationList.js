const verifyToken = require('../middleware/authenticateToken');
const dbConnection = require('../dbConnection');

const getRegistrationList = (req) => new Promise((resolve, reject) => {
  setTimeout(() => {
    // console.log('in actions : ');
    // console.log('Req : ', req.headers['x-access-token']);
    verifyToken.verifyToken(req.headers['x-access-token'])
      .then((token) => {
        // console.log('verified: ', req.body);
        const query = `SELECT * FROM eventregistration_view where eventID = '${req.query.eventid}';`;
        // console.log(query);
        dbConnection.dbConn(query)
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

exports.getRegistrationList = getRegistrationList;

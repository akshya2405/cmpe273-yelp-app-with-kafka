const verifyToken = require('../middleware/authenticateToken');
const dbConnection = require('../dbConnection');

const getReviews = (req) => new Promise((resolve, reject) => {
  setTimeout(() => {
    // console.log('in actions : ');
    // console.log('Req : ', req.headers['x-access-token']);
    // console.log('verified: ', req.body);
    const query = `SELECT * FROM review_view where restaurantID = '${req.query.restID}';`;
    // console.log(query);
    dbConnection.dbConn(query)
      .then((output) => {
        // console.log(output);
        resolve(output);
      })
      .catch((err) => {
        // console.log(err);
        reject(err);
      });
  }, 50);
});

exports.getReviews = getReviews;

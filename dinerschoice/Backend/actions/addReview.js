const moment = require('moment');
const verifyToken = require('../middleware/authenticateToken');
const dbConnection = require('../dbConnection');

const addReview = (req) => new Promise((resolve, reject) => {
  setTimeout(() => {
    // console.log('in actions : ');
    // console.log('Req : ', req.headers['x-access-token']);
    const reviewDate = moment(Date.now()).format('YYYY-MM-DD');
    verifyToken.verifyToken(req.headers['x-access-token'])
      .then((token) => {
        const custIDQuery = `SELECT customerID FROM customerprofile where email = '${token}';`;
        dbConnection.dbConn(custIDQuery)
          .then((id) => {
            // console.log(id);
            const query = `INSERT INTO reviews (customerID, restaurantID, date, rating, comment)
            VALUES (${id[0].customerID}, ${req.body.review.restaurantID}, '${reviewDate}', 
                ${req.body.review.rating}, '${req.body.review.review}')`;
            // console.log(query);
            dbConnection.dbConn(query)
              .then((output) => resolve(output));
          });
      })
      .catch((err) => {
        // console.log(err);
        reject(err);
      });
  }, 50);
});

exports.addReview = addReview;

const verifyToken = require('../middleware/authenticateToken');
const dbConnection = require('../dbConnection');

const getUpcomingEvents = (req) => new Promise((resolve, reject) => {
  setTimeout(() => {
    // console.log('in actions : ');
    // console.log('Req : ', req.headers['x-access-token']);
    verifyToken.verifyToken(req.headers['x-access-token'])
      .then((token) => {
        const query = 'SELECT * FROM events WHERE date >= CURDATE() ORDER BY date DESC;';
        // console.log(query);
        dbConnection.dbConn(query)
          .then((output) => {
            // console.log(output);
            resolve(output);
          })
          .catch((err) => {
            reject(err);
          });
      })
      .catch((err) => {
        // console.log(err);
        reject(err);
      });
  }, 50);
});

exports.getUpcomingEvents = getUpcomingEvents;

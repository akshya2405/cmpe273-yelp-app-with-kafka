const verifyToken = require('../middleware/authenticateToken');
const dbConnection = require('../dbConnection');

const getEvents = (req) => new Promise((resolve, reject) => {
  setTimeout(() => {
    // console.log('in actions : ');
    // console.log('Req : ', req.headers['x-access-token']);
    verifyToken.verifyToken(req.headers['x-access-token'])
      .then((token) => {
        const restIDQuery = `SELECT restaurantID FROM restaurantprofile where email = '${token}';`;
        dbConnection.dbConn(restIDQuery)
          .then((id) => {
            // console.log(id[0].restaurantID);
            const query = `SELECT * FROM events where restaurantID = '${id[0].restaurantID}';`;
            // console.log(query);
            dbConnection.dbConn(query)
              .then((output) => {
                // console.log(output);
                const result = [];
                // eslint-disable-next-line array-callback-return
                output.map((value) => {
                  const val = { ...value, fromDB: true };
                  result.push(val);
                });
                // console.log('get events result: ', result);
                resolve(result);
              });
          });
      })
      .catch((err) => {
        // console.log(err);
        reject(err);
      });
  }, 50);
});

exports.getEvents = getEvents;

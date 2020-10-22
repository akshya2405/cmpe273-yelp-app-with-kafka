const verifyToken = require('../middleware/authenticateToken');
const dbConnection = require('../dbConnection');

const eventUpdate = (req) => new Promise((resolve, reject) => {
  setTimeout(() => {
    // console.log('in actions : ');
    // console.log('Req : ', req.headers['x-access-token']);
    verifyToken.verifyToken(req.headers['x-access-token'])
      .then((token) => {
        // console.log('update list : ', req.body.updateList);
        // console.log('delete ids : ', req.body.deleteIds);
        const restIDQuery = `SELECT restaurantID FROM restaurantprofile where email = '${token}';`;
        dbConnection.dbConn(restIDQuery)
          .then((id) => {
            // console.log(id[0].restaurantID);
            if (req.body.deleteIds) {
              req.body.deleteIds.map((value) => {
                const deleteQuery = `DELETE FROM events WHERE eventID = ${value}`;
                // console.log(deleteQuery);
                dbConnection.dbConn(deleteQuery);
              });
            }
            if (req.body.updateList) {
              req.body.updateList.map((value) => {
                const updateQuery = `INSERT INTO events (restaurantID, name, description, date, time, location, hashtags)
                    VALUES (${id[0].restaurantID}, '${value.name}', '${value.description}', '${value.date}', '${value.time}', '${value.location}', '${value.hashtags}')`;
                // console.log(updateQuery);
                dbConnection.dbConn(updateQuery);
              });
            }
          });
        resolve();
      })
      .catch((err) => {
        // console.log(err);
        reject(err);
      });
  }, 50);
});

exports.eventUpdate = eventUpdate;

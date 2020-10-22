const verifyToken = require('../middleware/authenticateToken');
const dbConnection = require('../dbConnection');

const getValues = (id, token) => new Promise((resolve, reject) => {
  // console.log('in get menu id:', id);
  let query = '';
  if (id === null) query = `SELECT * FROM restaurantprofile where email = '${token}';`;
  else query = `SELECT * FROM restaurantprofile where restaurantID = ${id};`;
  // console.log(query);
  dbConnection.dbConn(query)
    .then((restID) => {
      const query = `SELECT * FROM dish_details_view where restaurantID = '${restID[0].restaurantID}';`;
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
          // console.log('get menu result: ', result);
          resolve(result);
        });
    })
    .catch((err) => {
      reject(err);
    });
});

const getMenu = (req) => new Promise((resolve, reject) => {
  setTimeout(() => {
    if (req.query.restID === undefined) {
      verifyToken.verifyToken(req.headers['x-access-token'])
        .then((token) => {
          getValues(null, token)
            .then((output) => {
              resolve(output);
            });
        })
        .catch((err) => {
          // console.log(err);
          reject(err);
        });
    } else {
      getValues(req.query.restID, null)
        .then((output) => {
          resolve(output);
        });
    }
  }, 50);
});

exports.getMenu = getMenu;

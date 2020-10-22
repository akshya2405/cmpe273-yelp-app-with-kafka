const verifyToken = require('../middleware/authenticateToken');
const dbConnection = require('../dbConnection');

const menuUpdate = (req) => new Promise((resolve, reject) => {
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
                const deleteQuery = `DELETE FROM dishes WHERE dishID = ${value}`;
                // console.log(deleteQuery);
                dbConnection.dbConn(deleteQuery);
              });
            }
            if (req.body.updateList) {
              req.body.updateList.map((value) => {
                const updateQuery = `INSERT INTO dishes (restaurantID, dishName, description, ingredients, price, category)
                  VALUES (${id[0].restaurantID}, '${value.dishName}', '${value.description}', '${value.ingredients}', ${value.price}, '${value.category}')
                  ON DUPLICATE KEY UPDATE description='${value.description}', ingredients='${value.ingredients}', price='${value.price}', category='${value.category}'`;
                // console.log(updateQuery);
                dbConnection.dbConn(updateQuery).then((res) => {
                  const dishId = res.insertId;
                  if (value.imageurl) {
                    const imageInsertQuery = `INSERT INTO dishimages (restaurantID, dishID, imageurl) 
                                              VALUES (${id[0].restaurantID}, ${dishId}, '${value.imageurl}')`;
                    dbConnection.dbConn(imageInsertQuery);
                  }
                });
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

exports.menuUpdate = menuUpdate;

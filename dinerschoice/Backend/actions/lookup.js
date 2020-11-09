const verifyToken = require('../middleware/authenticateToken');
const dbConnection = require('../dbConnection');

const lookup = (req) => new Promise((resolve, reject) => {
    setTimeout(() => {
        // console.log('in actions : ');
        // console.log('Req : ', req.headers['x-access-token']);

        const searchToken = req.body.lookupParams.searchToken.trim();
        const lookupQuery = `SELECT distinct restaurantID, name, description, cuisine, mode, city, state, zipcode, stars, reviewcount, image  FROM dashboard_view 
        where 
        name like '%${searchToken}%'
        or cuisine like '%${searchToken}%'
        or mode like '%${searchToken}%'
        or city like '%${searchToken}%'
        or state like '%${searchToken}%'
        or dishName like '%${searchToken}%'
        order by stars desc, reviewcount desc
        limit 50`;
        dbConnection.dbConn(lookupQuery)
            .then((output) => {
                // TODO : Format JSON to different structure if needed.
                resolve(output)
            });

    }, 50);
});

exports.lookup = lookup;

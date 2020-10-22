const verifyToken = require('../middleware/authenticateToken');
const dbConnection = require('../dbConnection');

const createHoursMap = (dbResults) => {
    const hours = new Map();
    dbResults.map((result) => {
        const details = new Map();
        details.set('opentime', result.openTime);
        details.set('openclose', result.openClose);
        details.set('closetime', result.closeTime);
        hours.set(result.dayOfWeek, Object.fromEntries(details));
        return true;
    });
    return Object.fromEntries(hours);
};

const getValues = (id, token) => new Promise((resolve, reject) => {
    let query = '';
    if (id === null)
    query = `SELECT * FROM restaurantprofile where email = '${token}';`;
    else query = `SELECT * FROM restaurantprofile where restaurantID = ${id};`;
    // console.log(query);
    dbConnection.dbConn(query)
        .then((output) => {
            // console.log(output);
            const query1 = `SELECT * FROM hours where restaurantID = ${output[0].restaurantID};`;
            // console.log(query1);
            dbConnection.dbConn(query1)
                .then((hoursOutput) => {
                    const hoursObj = createHoursMap(hoursOutput);
                    // console.log('hours obj:', hoursObj);
                    const query2 = `SELECT image FROM restaurantimages where restaurantID = '${output[0].restaurantID}';`;
                    // console.log(query2);
                    dbConnection.dbConn(query2)
                        .then((imgs) => {
                            // console.log(imgs);
                            const images = [];
                            imgs.map((img) => images.push(img.image));
                            // console.log(images);
                            const result = { ...output[0], hours: hoursObj, images };
                            // console.log(JSON.stringify(result));
                            resolve(result);
                        });
                });
        })
        .catch((err) => {
            reject(err);
        });
});

const restaurantProfile = (req) => new Promise((resolve, reject) => {
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

exports.restaurantProfile = restaurantProfile;
const verifyToken = require('../middleware/authenticateToken');
const dbConnection = require('../dbConnection');

const customerProfileUpdate = (req) => new Promise((resolve, reject) => {
  setTimeout(() => {
    // console.log('in actions : ');
    // console.log('Req : ', req.headers['x-access-token']);
    let query = '';
    verifyToken.verifyToken(req.headers['x-access-token'])
      .then((token) => {
          if(req.body.updateDetails.uploadedImageUrl) {
              const profileUrl = 'images/uploads/'+req.body.updateDetails.uploadedImageUrl;
              query = `UPDATE customerprofile 
        SET fname = '${req.body.updateDetails.fname}', 
        lname = '${req.body.updateDetails.lname}', 
        city = '${req.body.updateDetails.city}', 
        state = '${req.body.updateDetails.state}', 
        dob = '${req.body.updateDetails.dob}',
        country = '${req.body.updateDetails.country}', 
        phoneNumber = '${req.body.updateDetails.phoneNumber}',
        favorites = '${req.body.updateDetails.favorites}',
        headline = '${req.body.updateDetails.headline}',
        nickname = '${req.body.updateDetails.nickname}',
        profileimgurl = '${profileUrl}'
        where email = '${token}';`;
          } else {
              query = `UPDATE customerprofile 
        SET fname = '${req.body.updateDetails.fname}', 
        lname = '${req.body.updateDetails.lname}', 
        city = '${req.body.updateDetails.city}', 
        state = '${req.body.updateDetails.state}', 
        dob = '${req.body.updateDetails.dob}',
        country = '${req.body.updateDetails.country}', 
        phoneNumber = '${req.body.updateDetails.phoneNumber}',
        favorites = '${req.body.updateDetails.favorites}',
        headline = '${req.body.updateDetails.headline}',
        nickname = '${req.body.updateDetails.nickname}'
        where email = '${token}';`;
          }
        // console.log(query);

        dbConnection.dbConn(query)
          .then((output) => resolve(output));
      })
      .catch((err) => {
        // console.log(err);
        reject(err);
      });
  }, 50);
});

exports.customerProfileUpdate = customerProfileUpdate;

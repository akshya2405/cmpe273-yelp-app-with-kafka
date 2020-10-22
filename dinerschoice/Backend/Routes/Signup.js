const express = require('express');
const bcrypt = require('bcryptjs');

const router = express.Router();
const Users = require('../Models/UserModel');

router.get('/signup', (req, res) => {
  // console.log('Signup GET');
  res.end();
});

router.post('/signup', (req, res) => {
  const hashedPassword = bcrypt.hashSync(req.body.user.password, 10);
  const newUser = new Users({
    category: req.body.user.category,
    email: req.body.user.email,
    password: hashedPassword,
  });

  console.log('in signup backend : ', newUser);

  newUser.save((error, data) => {
    if (error) {
      res.writeHead(500, {
        'Content-Type': 'text/plain',
      });
      res.end();
    } else {
      res.writeHead(200, {
        'Content-Type': 'text/plain',
      });
      res.end();
    }
  });

//   let query = `INSERT INTO user VALUES ('${req.body.user.category}', '${req.body.user.email}', '${hashedPassword}');`;
//   // console.log(query);
//   dbConnection.dbConn(query)
//     .then((result) => {
//       // console.log(result);
//       if (req.body.user.category === 'Customer') {
//         const choosingSince = moment(Date.now()).format('YYYY-MM-DD');
//         // console.log(choosingSince);
//         query = `INSERT INTO customerprofile (fname, lname, email, choosingSince) VALUES ('${req.body.user.custFName}', '${req.body.user.custLName}', '${req.body.user.email}', '${choosingSince}');`;
//         // console.log(query);
//         (dbConnection.dbConn(query)
//           .then((output) => {
//             // console.log(output);
//             sessionStorage.setItem('userid', output.insertId);
//             res.writeHead(200, '*** Signed up successfully ****', {
//               'Content-Type': 'text/plain',
//             });
//             res.end();
//           })
//           .catch((err) => {
//             // console.log(err);
//             res.status(400).json({ message: '*** Could not sign up. Please retry ***' });
//             res.end();
//           }));
//       } else {
//         query = `INSERT INTO restaurantprofile (name, email, streetAddress, city, state, country, zipcode) VALUES ('${req.body.user.restName}', '${req.body.user.email}', '${req.body.user.address}', '${req.body.user.city}', '${req.body.user.state}', '${req.body.user.country}', '${req.body.user.zipcode}');`;
//         // console.log(query);
//         (dbConnection.dbConn(query)
//           .then((output) => {
//             // console.log(output);
//             sessionStorage.setItem('userid', output.insertId);
//             res.writeHead(200, '*** Signed up successfully ****', {
//               'Content-Type': 'text/plain',
//             });
//             res.end();
//           })
//           .catch((err) => {
//             // console.log(err);
//             res.writeHead(400, '*** Could not sign up. Please retry ****', {
//               'Content-Type': 'text/plain',
//             });
//             res.end();
//           }));
//       }
//     })
//     .catch((err) => {
//       // console.log(err);
//       res.writeHead(400, '*** Something went wrong. Please try again later ****', {
//         'Content-Type': 'text/plain',
//       });
//       res.end();
//     });
});

module.exports = router;

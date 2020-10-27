/* eslint-disable linebreak-style */
/* eslint-disable no-console */
/* eslint-disable max-len */
// import the require dependencies
const express = require('express');

const app = express();
const moment = require('moment');
const bodyParser = require('body-parser');
const session = require('express-session');
const cookieParser = require('cookie-parser');
const cors = require('cors');
const sessionStorage = require('node-sessionstorage');
const bcrypt = require('bcryptjs');
const mongoose = require('mongoose');

const jwt = require('jsonwebtoken');
const dbConnection = require('./dbConnection');
const config = require('./config/auth.config');
const verifyToken = require('./middleware/authenticateToken');
const restaurantProfile = require('./actions/restaurantProfile');
const customerProfile = require('./actions/getCustProfile');
const customerProfileUpdate = require('./actions/customerProfileUpdate');
const getMenu = require('./actions/getMenu');
const menuUpdate = require('./actions/menuUpdate');
const getEvents = require('./actions/getEvents');
const eventUpdate = require('./actions/eventUpdate');
const getRegistrationList = require('./actions/getRegistrationList');
const getUpcomingEvents = require('./actions/getUpcomingEvents');
const getRegisteredEvents = require('./actions/getRegisteredEvents');
const registerfor = require('./actions/registerfor');
const addReview = require('./actions/addReview');
const getReviews = require('./actions/getReviews');
const getCustReviews = require('./actions/getCustReviews');
const uploadImage = require('./actions/uploadImage');
const lookup = require('./actions/lookup');
const placeOrder = require('./actions/placeOrder');
const getCustomerOrders = require('./actions/getCustomerOrders');
const getRestaurantOrders = require('./actions/getRestaurantOrders');
const updateOrderStatus = require('./actions/updateOrderStatus');
const { frontendURL, mongoDB } = require('./config/auth.config');

app.set('view engine', 'ejs');

// use cors to allow cross origin resource sharing
app.use(cors({ origin: frontendURL, credentials: true }));

// use express session to maintain session data
app.use(session({
  secret: 'cmpe273_diners_choice_passport_kafka_mongo',
  resave: false, // Forces the session to be saved back to the session store, even if the session was never modified during the request
  cookie: { maxAge: 900000, httpOnly: false, path: '/' },
  saveUninitialized: false, // Force to save uninitialized session to db. A session is uninitialized when it is new but not modified.
  duration: 60 * 60 * 1000, // Overall duration of Session : 30 minutes : 1800 seconds
  activeDuration: 5 * 60 * 1000,
}));

app.use(bodyParser.json());

// Allow Access Control
app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', frontendURL);
  res.setHeader('Access-Control-Allow-Credentials', true);
  res.setHeader('Access-Control-Allow-Methods', 'GET,HEAD,OPTIONS,POST,PUT,DELETE');
  res.setHeader('Access-Control-Allow-Headers', 'Access-Control-Allow-Headers, Origin,Accept, X-Requested-With, Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers');
  res.setHeader('Cache-Control', 'no-cache');
  next();
});

const options = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  poolSize: 500,
  bufferMaxEntries: 0,
};

mongoose.connect(mongoDB, options, (err, res) => {
  if (err) {
    console.log(err);
    console.log('MongoDB Connection Failed');
  } else {
    console.log('MongoDB Connected');
  }
});

const Login = require('./Routes/Login');
const Signup = require('./Routes/Signup');

app.use('/user', Login);
app.use('/user', Signup);

// Route to handle Post Request Call
// app.post('/login', (req, res) => {
//   // get the password from database for the given email
//   const query = `SELECT * FROM user where email = '${req.body.email}';`;
//   // console.log(query);
//   dbConnection.dbConn(query)
//     .then((result) => {
//       // console.log(result);
//       if (result.length !== 0) {
//         // console.log(bcrypt.hashSync(req.body.password, 10));
//         if (bcrypt.compareSync(req.body.password, result[0].password) && result[0].category === req.body.category) {
//           // console.log('Match!');
//           const token = jwt.sign({ id: result[0].email }, config.secret, { expiresIn: 86400 });
//           const user = { category: req.body.category, userid: result[0].email, accessToken: token };
//           res.writeHead(200, '*** Login successful ****', {
//             'Content-Type': 'application/json',
//           });
//           res.end(JSON.stringify(user));
//         } else {
//           // console.log('Mismatch');
//           res.writeHead(400, '*** Invalid usertype/password. Please verify if you are logging in as the right user ****', {
//             'Content-Type': 'text/plain',
//           });
//           res.end();
//         }
//       } else {
//         res.writeHead(400, '*** Invalid emailID ****', {
//           'Content-Type': 'text/plain',
//         });
//         res.end();
//       }
//     })
//     .catch((err) => {
//       // console.log(err);
//       res.writeHead(400, '*** Something went wrong. Please try again later ****', {
//         'Content-Type': 'text/plain',
//       });
//       res.end();
//     });
// });

// app.get('/signup', (req, res) => {
//   // console.log('Signup GET');
//   res.end();
// });

// app.post('/signup', (req, res) => {
//   // console.log('Inside Sign Up POST request');
//   // console.log('Req Body : ', req.body);
//   const hashedPassword = bcrypt.hashSync(req.body.user.password, 10);
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
// });

app.get('/restaurantDashboard', (req, res) => {
  // console.log('Inside Restaurant Dashboard');
  // console.log('Req : ', req.headers['x-access-token']);
  restaurantProfile.restaurantProfile(req)
    .then((output) => {
      res.writeHead(200, {
        'Content-Type': 'application/json',
      });
      res.end(JSON.stringify(output));
    })
    .catch((err) => {
      // console.log(err);
      res.writeHead(400, '*** Something went wrong. Please try again later ****', {
        'Content-Type': 'text/plain',
      });
      res.end();
    });
});

app.get('/editRestaurantProfile', (req, res) => {
  // console.log('Inside Restaurant Dashboard');
  // console.log('Req : ', req.headers['x-access-token']);
  verifyToken.verifyToken(req.headers['x-access-token'])
    .then((token) => {
      const query = `SELECT * FROM restaurantprofile where email = '${token}';`;
      // console.log(query);
      dbConnection.dbConn(query)
        .then((output) => {
          // console.log(output);
          res.writeHead(200, {
            'Content-Type': 'application/json',
          });
          res.end(JSON.stringify(output[0]));
        });
    });
});

const updateHours = (restID, hoursObj) => {
  const daysOfWeek = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
  const hours = new Map(Object.entries(hoursObj));
  // console.log('hours map:', hours);
  daysOfWeek.map((day) => {
    if (hours.has(day)) {
      const lookupMap = new Map(Object.entries(hours.get(day)));
      // console.log('lookup map:', lookupMap);
      const opentime = lookupMap.get('opentime');
      const closetime = lookupMap.get('closetime');
      const openclose = lookupMap.get('openclose');
      const query = `INSERT INTO hours (restaurantID, dayOfWeek, openTime, closeTime, openClose) VALUES(${restID}, '${day}', '${opentime}', '${closetime}', '${openclose}') ON DUPLICATE KEY UPDATE    
      openTime='${opentime}', closeTime='${closetime}', openClose='${openclose}'`;
      // console.log(query);
      dbConnection.dbConn(query);
    }
    return true;
  });
};

app.post('/editRestaurantProfile', (req, res) => {
  // console.log('Inside Restaurant edit profile post');
  // console.log('Req. Body :', req.body);
  verifyToken.verifyToken(req.headers['x-access-token'])
    .then((token) => {
      let isopen = -1;
      if (req.body.updateDetails.status === 'Open') {
        isopen = 1;
      } else { isopen = 0; }

      const query = `UPDATE restaurantprofile 
                      SET name = '${req.body.updateDetails.restaurantName}', 
                      streetAddress = '${req.body.updateDetails.address}', 
                      city = '${req.body.updateDetails.city}', 
                      state = '${req.body.updateDetails.state}', 
                      zipcode = '${req.body.updateDetails.zipcode}',
                      description = '${req.body.updateDetails.description}', 
                      contactinfo = '${req.body.updateDetails.contactinfo}',
                      cuisine = '${req.body.updateDetails.cuisine}',
                      status = '${req.body.updateDetails.status}',
                      mode = '${req.body.updateDetails.modes}',
                      isopen = '${isopen}'
                      where email = '${token}';`;
      // console.log(query);
      dbConnection.dbConn(query)
        .then((output) => {
          // console.log(output);
          if (req.body.updateDetails.hours.size !== 0) {
            updateHours(req.body.updateDetails.restaurantID, req.body.updateDetails.hours);
          }
          if (req.body.updateDetails.uploadedImageUrl) {
            const imageUrl = `images/uploads/${req.body.updateDetails.uploadedImageUrl}`;
            const imgquery = `INSERT INTO restaurantimages (restaurantID, image, tag) VALUES (${req.body.updateDetails.restaurantID}, '${imageUrl}', 'dish')`;
            // console.log(imgquery);
            dbConnection.dbConn(imgquery);
          }
          res.writeHead(200, '*** Updated successfully ****', {
            'Content-Type': 'text/plain',
          });
          res.end();
        })
        .catch((err) => {
          // console.log(err);
          res.writeHead(400, '*** Something went wrong. Please try again later ****', {
            'Content-Type': 'text/plain',
          });
          res.end();
        });
    });
});

app.get('/customerProfile', (req, res) => {
  // console.log('Inside Customer Profile');
  // console.log('req: ', req.query.custID);
  // console.log('req: ', req.headers['x-access-token']);
  customerProfile.customerProfile(req)
    .then((output) => {
      res.writeHead(200, {
        'Content-Type': 'application/json',
      });
      res.end(JSON.stringify(output));
    })
    .catch((err) => {
      // console.log(err);
      res.writeHead(400, '*** Something went wrong. Please try again later ****', {
        'Content-Type': 'text/plain',
      });
      res.end();
    });
});

app.post('/editProfile', (req, res) => {
  // console.log('Inside Customer Profile Edit');
  // console.log('req: ', req.headers['x-access-token']);
  customerProfileUpdate.customerProfileUpdate(req)
    .then((output) => {
      // console.log(output);
      res.writeHead(200, {
        'Content-Type': 'application/json',
      });
      res.end(JSON.stringify(output));
    })
    .catch((err) => {
      // console.log(err);
      res.writeHead(400, '*** Something went wrong. Please try again later ****', {
        'Content-Type': 'text/plain',
      });
      res.end();
    });
});

app.get('/menu', (req, res) => {
  // console.log('Inside get menu');
  // console.log('req: ', req.headers['x-access-token']);
  getMenu.getMenu(req)
    .then((output) => {
      // console.log(output);
      res.writeHead(200, {
        'Content-Type': 'application/json',
      });
      res.end(JSON.stringify(output));
    })
    .catch((err) => {
      // console.log(err);
      res.writeHead(400, '*** Something went wrong. Please try again later ****', {
        'Content-Type': 'text/plain',
      });
      res.end();
    });
});

app.post('/menuUpdate', (req, res) => {
  // console.log('Inside add dish');
  // console.log('req: ', req.body.updateDetails);
  menuUpdate.menuUpdate(req)
    .then(() => {
      res.writeHead(200, {
        'Content-Type': 'application/json',
      });
      res.end();
    })
    .catch((err) => {
      // console.log(err);
      res.writeHead(400, '*** Something went wrong. Please try again later ****', {
        'Content-Type': 'text/plain',
      });
      res.end();
    });
});

app.get('/events', (req, res) => {
  // console.log('Inside get events');
  // console.log('req: ', req.headers['x-access-token']);
  getEvents.getEvents(req)
    .then((output) => {
      // console.log(output);
      res.writeHead(200, {
        'Content-Type': 'application/json',
      });
      res.end(JSON.stringify(output));
    })
    .catch((err) => {
      // console.log(err);
      res.writeHead(400, '*** Something went wrong. Please try again later ****', {
        'Content-Type': 'text/plain',
      });
      res.end();
    });
});

app.post('/eventsUpdate', (req, res) => {
  // console.log('Inside event update');
  // console.log('req: ', req.body.updateDetails);
  eventUpdate.eventUpdate(req)
    .then(() => {
      res.writeHead(200, {
        'Content-Type': 'application/json',
      });
      res.end();
    })
    .catch((err) => {
      // console.log(err);
      res.writeHead(400, '*** Something went wrong. Please try again later ****', {
        'Content-Type': 'text/plain',
      });
      res.end();
    });
});

app.get('/registrationList', (req, res) => {
  // console.log('Inside get registration list');
  // console.log('req: ', req.query.eventid);
  // console.log('req header:', req.headers['x-access-token']);
  getRegistrationList.getRegistrationList(req)
    .then((output) => {
      // console.log(output);
      res.writeHead(200, {
        'Content-Type': 'application/json',
      });
      res.end(JSON.stringify(output));
    })
    .catch((err) => {
      // console.log(err);
      res.writeHead(400, '*** Something went wrong. Please try again later ****', {
        'Content-Type': 'text/plain',
      });
      res.end();
    });
});

app.get('/allEvents', (req, res) => {
  // console.log('Inside get registration list');
  // console.log('req: ', req.query.eventid);
  // console.log('req header:', req.headers['x-access-token']);
  getUpcomingEvents.getUpcomingEvents(req)
    .then((output) => {
      // console.log(output);
      res.writeHead(200, {
        'Content-Type': 'application/json',
      });
      res.end(JSON.stringify(output));
    })
    .catch((err) => {
      // console.log(err);
      res.writeHead(400, '*** Something went wrong. Please try again later ****', {
        'Content-Type': 'text/plain',
      });
      res.end();
    });
});

app.get('/registeredEvents', (req, res) => {
  // console.log('Inside get registration list');
  // console.log('req: ', req.query.eventid);
  // console.log('req header:', req.headers['x-access-token']);
  getRegisteredEvents.getRegisteredEvents(req)
    .then((output) => {
      // console.log('output: ', output);
      res.writeHead(200, {
        'Content-Type': 'application/json',
      });
      res.end(JSON.stringify(output));
    })
    .catch((err) => {
      // console.log(err);
      res.writeHead(400, '*** Something went wrong. Please try again later ****', {
        'Content-Type': 'text/plain',
      });
      res.end();
    });
});

app.post('/registerfor', (req, res) => {
  // console.log('Inside register for');
  // console.log('req: ', req.body.eventID);
  registerfor.registerfor(req)
    .then(() => {
      res.writeHead(200, {
        'Content-Type': 'application/json',
      });
      res.end();
    })
    .catch((err) => {
      // console.log(err);
      res.writeHead(400, '*** Something went wrong. Please try again later ****', {
        'Content-Type': 'text/plain',
      });
      res.end();
    });
});

app.post('/addReview', (req, res) => {
  // console.log('Inside add review');
  // console.log('req: ', req.body.review);
  addReview.addReview(req)
    .then((output) => {
      // console.log(output);
      res.writeHead(200, {
        'Content-Type': 'application/json',
      });
      res.end(JSON.stringify(output));
    })
    .catch((err) => {
      // console.log(err);
      res.writeHead(400, '*** Something went wrong. Please try again later ****', {
        'Content-Type': 'text/plain',
      });
      res.end();
    });
});

app.get('/getReviews', (req, res) => {
  // console.log('Inside get reviews list');
  // console.log('req: ', req.query.restID);
  // console.log('req header:', req.headers['x-access-token']);
  getReviews.getReviews(req)
    .then((output) => {
      // console.log('output: ', output);
      res.writeHead(200, {
        'Content-Type': 'application/json',
      });
      res.end(JSON.stringify(output));
    })
    .catch((err) => {
      // console.log(err);
      res.writeHead(400, '*** Something went wrong. Please try again later ****', {
        'Content-Type': 'text/plain',
      });
      res.end();
    });
});

app.get('/getCustReviews', (req, res) => {
  // console.log('Inside get reviews list');
  // console.log('req header:', req.headers['x-access-token']);
  getCustReviews.getCustReviews(req)
    .then((output) => {
      // console.log('output: ', output);
      res.writeHead(200, {
        'Content-Type': 'application/json',
      });
      res.end(JSON.stringify(output));
    })
    .catch((err) => {
      // console.log(err);
      res.writeHead(400, '*** Something went wrong. Please try again later ****', {
        'Content-Type': 'text/plain',
      });
      res.end();
    });
});

app.post('/upload', (req, res) => {
  // console.log(req);
  uploadImage.uploadImage(req)
    .then((result) => {
      res.writeHead(200, {
        'Content-Type': 'application/json',
      });
      res.end(JSON.stringify(result));
    })
    .catch((err) => {
      // console.log(err);
      res.writeHead(400, '*** Something went wrong. Please try again later ****', {
        'Content-Type': 'text/plain',
      });
      res.end();
    });
});

app.post('/lookup', (req, res) => {
//   console.log(req);
  // lookup.lookup(req)
  //   .then((result) => {
  //     res.writeHead(200, {
  //       'Content-Type': 'application/json',
  //     });
  //     res.end(JSON.stringify(result));
  //   })
  //   .catch((err) => {
  //     // console.log(err);
  //     res.writeHead(400, '*** Something went wrong. Please try again later ****', {
  //       'Content-Type': 'text/plain',
  //     });
  //     res.end();
  //   });
  res.end();
});

app.post('/placeOrder', (req, res) => {
  // console.log(req.body);
  // console.log(JSON.parse(req.body.order.items));
  placeOrder.placeOrder(req)
    .then((output) => {
      res.writeHead(200, {
        'Content-Type': 'application/json',
      });
      res.end(JSON.stringify(output));
    })
    .catch((err) => {
      // console.log(err);
      res.writeHead(400, '*** Something went wrong. Please try again later ****', {
        'Content-Type': 'text/plain',
      });
      res.end();
    });
});

app.get('/getcustomerOrders', (req, res) => {
  // console.log('Inside get customer orders');
  // console.log('req header:', req.headers['x-access-token']);
  getCustomerOrders.getCustomerOrders(req)
    .then((output) => {
      // console.log('output: ', output);
      res.writeHead(200, {
        'Content-Type': 'application/json',
      });
      res.end(JSON.stringify(output));
    })
    .catch((err) => {
      // console.log(err);
      res.writeHead(400, '*** Something went wrong. Please try again later ****', {
        'Content-Type': 'text/plain',
      });
      res.end();
    });
});

app.get('/getrestaurantOrders', (req, res) => {
  // console.log('Inside get restaurant orders');
  // console.log('req header:', req.headers['x-access-token']);
  getRestaurantOrders.getRestaurantOrders(req)
    .then((output) => {
      // console.log('output: ', output);
      res.writeHead(200, {
        'Content-Type': 'application/json',
      });
      res.end(JSON.stringify(output));
    })
    .catch((err) => {
      // console.log(err);
      res.writeHead(400, '*** Something went wrong. Please try again later ****', {
        'Content-Type': 'text/plain',
      });
      res.end();
    });
});

app.post('/updateOrderStatus', (req, res) => {
  // console.log(req.body);
  updateOrderStatus.updateOrderStatus(req)
    .then((output) => {
      res.writeHead(200, {
        'Content-Type': 'application/json',
      });
      res.end(JSON.stringify(output));
    })
    .catch((err) => {
      // console.log(err);
      res.writeHead(400, '*** Something went wrong. Please try again later ****', {
        'Content-Type': 'text/plain',
      });
      res.end();
    });
});

// start your server on port 3001
app.listen(3001);
console.log('Server Listening on port 3001');

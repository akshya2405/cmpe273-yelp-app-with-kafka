/* eslint-disable linebreak-style */
/* eslint-disable no-console */
/* eslint-disable max-len */
// import the require dependencies
const express = require('express');

const app = express();
const bodyParser = require('body-parser');
const session = require('express-session');
const cors = require('cors');

// const dbConnection = require('./dbConnection');
// const verifyToken = require('./middleware/authenticateToken');
// const restaurantProfile = require('./actions/restaurantProfile');
// const customerProfile = require('./actions/getCustProfile');
// const customerProfileUpdate = require('./actions/customerProfileUpdate');
// const getMenu = require('./actions/getMenu');
// const menuUpdate = require('./actions/menuUpdate');
// const getEvents = require('./actions/getEvents');
// const eventUpdate = require('./actions/eventUpdate');
// const getRegistrationList = require('./actions/getRegistrationList');
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
const { frontendURL } = require('./config/auth.config');

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

const Login = require('./Routes/Login');
const Signup = require('./Routes/Signup');
const RestProfile = require('./Routes/RestProfile');
const EditProfile = require('./Routes/EditProfile');
const EditMenu = require('./Routes/EditMenu');
const RestOrders = require('./Routes/RestOrders');
const RestEvents = require('./Routes/RestEvents');
const EditEvents = require('./Routes/EditEvents');
const LookupService = require('./Routes/LookupService');
const CustProfile = require('./Routes/CustProfile');

app.use('/user', Login);
app.use('/user', Signup);
app.use('/', RestProfile);
app.use('/', EditProfile);
app.use('/', EditMenu);
app.use('/', RestOrders);
app.use('/', RestEvents);
app.use('/', EditEvents);
app.use('/', LookupService);
app.use('/', CustProfile);

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
  console.log('in upload');
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

// start your server on port 3001
app.listen(3001);
console.log('Server Listening on port 3001');

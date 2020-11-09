/* eslint-disable linebreak-style */
/* eslint-disable no-console */
/* eslint-disable max-len */
// import the require dependencies
const express = require('express');

const app = express();
const bodyParser = require('body-parser');
const session = require('express-session');
const cors = require('cors');

const uploadImage = require('./actions/uploadImage');
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
const Orders = require('./Routes/Orders');
const GetEvents = require('./Routes/GetEvents');
const EditEvents = require('./Routes/EditEvents');
const LookupService = require('./Routes/LookupService');
const CustProfile = require('./Routes/CustProfile');
const PlaceOrder = require('./Routes/PlaceOrder');
const UpdateOrderStatus = require('./Routes/UpdateOrderStatus');
const RegisterForEvent = require('./Routes/RegisterFor');
const getAllCustomers = require('./Routes/GetAllCust');
const getMessagesList = require('./Routes/GetMessageList');
const addMessages = require('./Routes/AddMessages');
const getReviews = require('./Routes/GetReviews');
const addReview = require('./Routes/AddReviews');

app.use('/user', Login);
app.use('/user', Signup);
app.use('/', RestProfile);
app.use('/', EditProfile);
app.use('/', EditMenu);
app.use('/', Orders);
app.use('/', GetEvents);
app.use('/', EditEvents);
app.use('/', LookupService);
app.use('/', CustProfile);
app.use('/', PlaceOrder);
app.use('/', UpdateOrderStatus);
app.use('/', RegisterForEvent);
app.use('/', getAllCustomers);
app.use('/', getMessagesList);
app.use('/', addMessages);
app.use('/', getReviews);
app.use('/', addReview);

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

// start your server on port 3001
app.listen(3001);
console.log('Server Listening on port 3001');

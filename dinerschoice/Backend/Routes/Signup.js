const express = require('express');
const bcrypt = require('bcryptjs');

const router = express.Router();
const kafka = require('./kafka/client');

router.get('/signup', (req, res) => {
  // console.log('Signup GET');
  res.end();
});

router.post('/signup', (req, res) => {
  const hashedPassword = bcrypt.hashSync(req.body.user.password, 10);
  const payload = {
    category: req.body.user.category,
    email: req.body.user.email,
    password: hashedPassword,
    name: req.body.user.restName,
    streetAddress: req.body.user.address,
    city: req.body.user.city,
    state: req.body.user.state,
    country: req.body.user.country,
    zipcode: req.body.user.zipcode,
    fname: req.body.user.custFName,
    lname: req.body.user.custLName,
  };
  console.log(payload);
  kafka.make_request('signup_request', 'signup_response', payload, function (err, results) {
    console.log(`In Backend Routes Signup.js - signup : Results - ${results}`);
    if (err) {
      res.send();
    } else {
      res.send(results);
    }
  });
});

module.exports = router;

const express = require('express');

const router = express.Router();

const { auth } = require('../config/passport');
const kafka = require('./kafka/client');

auth();

router.post('/login', (req, res) => {
  console.log(req.body);
  const payload = {
    category: req.body.category,
    email: req.body.email,
    password: req.body.password,
  };

  kafka.make_request('login_request', 'login_response', payload, (err, results) => {
    console.log(`In Backend Routes Login.js - login : Results - ${results}`);
    if (err) {
      res.send();
    } else {
      res.send(results);
    }
  });
});

module.exports = router;

const express = require('express');

const router = express.Router();
const kafka = require('./kafka/client');
const { checkAuth } = require('../config/passport');

router.get('/getAllCust', checkAuth, (req, res) => {
  const payload = {};

  kafka.make_request('cust_profile_request', 'cust_profile_response', payload, function (err, results) {
    console.log(`In Backend Routes GetAllCust.js - events : Results - ${JSON.stringify(results)}`);
    if (err) {
      res.send(err);
    } else {
      res.send(results);
    }
  });
});

module.exports = router;

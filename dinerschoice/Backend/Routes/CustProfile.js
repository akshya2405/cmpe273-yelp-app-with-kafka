const express = require('express');

const router = express.Router();
const kafka = require('./kafka/client');
// const { checkAuth } = require('../config/passport');

router.get('/customerProfile', (req, res) => {
  console.log(req.query);
  const payload = {
    id: req.query.custID,
  };

  kafka.make_request('cust_profile_request', 'cust_profile_response', payload, function (err, results) {
    console.log(`In Backend Routes CustProfile.js - profile : Results - ${JSON.stringify(results)}`);
    if (err) {
      res.send(err);
    } else {
      res.send(results);
    }
  });
});

module.exports = router;

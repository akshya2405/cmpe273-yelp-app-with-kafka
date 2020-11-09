const express = require('express');

const router = express.Router();
const kafka = require('./kafka/client');
const { checkAuth } = require('../config/passport');

router.get('/restaurantDashboard', checkAuth, (req, res) => {
  console.log(req.query);
  const payload = {
    id: req.query.restID,
  };

  kafka.make_request('rest_profile_request', 'rest_profile_response', payload, function (err, results) {
    console.log(`In Backend Routes RestProfile.js - profile : Results - ${JSON.stringify(results)}`);
    if (err) {
      res.send(err);
    } else {
      res.status(200).send(results);
      // res.send(results);
    }
  });
});

module.exports = router;

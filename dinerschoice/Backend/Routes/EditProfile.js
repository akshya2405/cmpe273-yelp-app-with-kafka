const express = require('express');

const router = express.Router();
const kafka = require('./kafka/client');
const { checkAuth } = require('../config/passport');
// TODO: add details to payload
router.post('/editProfile', (req, res) => {
  const { updateDetails } = req.body;
  const payload = { ...updateDetails };
  console.log(payload);

  kafka.make_request('edit_profile_request', 'edit_profile_response', payload, function (err, results) {
    console.log(`In Backend Routes RestProfile.js - profile : Results - ${JSON.stringify(results)}`);
    if (err) {
      res.send(err);
    } else {
      res.send(results);
    }
  });
});

module.exports = router;

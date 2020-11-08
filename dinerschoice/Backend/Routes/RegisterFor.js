const express = require('express');

const router = express.Router();
const kafka = require('./kafka/client');
const { checkAuth } = require('../config/passport');
// TODO: add details to payload
router.post('/registerfor', checkAuth, (req, res) => {
  console.log(req.body);
  const { event, regList } = req.body;
  const payload = { event, regList };
  console.log('in register for: ', payload);

  kafka.make_request('register_to_event_request', 'register_to_event_response', payload, function (err, results) {
    console.log(`In Backend Routes RegisterTo.js - event : Results - ${JSON.stringify(results)}`);
    if (err) {
      res.send(err);
    } else {
      res.send(results);
    }
  });
});

module.exports = router;

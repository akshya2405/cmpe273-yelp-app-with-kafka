const express = require('express');

const router = express.Router();
const kafka = require('./kafka/client');
const { checkAuth } = require('../config/passport');
// TODO: add details to payload
router.post('/addMessages', checkAuth, (req, res) => {
  console.log(req.body);
  const { message } = req.body;
  const payload = { ...message };
  console.log('in add messages: ', payload);

  kafka.make_request('add_messages_request', 'add_messages_response', payload, function (err, results) {
    console.log(`In Backend Routes AddMessages.js - event : Results - ${JSON.stringify(results)}`);
    if (err) {
      res.send(err);
    } else {
      res.send(results);
    }
  });
});

module.exports = router;

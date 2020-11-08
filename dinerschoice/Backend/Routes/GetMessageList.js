const express = require('express');

const router = express.Router();
const kafka = require('./kafka/client');
const { checkAuth } = require('../config/passport');

router.get('/getMessages', checkAuth, (req, res) => {
  console.log(req.query);
  const payload = {
    category: req.query.category,
    id: req.query.id,
  };

  kafka.make_request('view_messages_request', 'view_messages_response', payload, function (err, results) {
    console.log(`In Backend Routes GetMessageList.js - events : Results - ${JSON.stringify(results)}`);
    if (err) {
      res.send(err);
    } else {
      res.send(results);
    }
  });
});

module.exports = router;

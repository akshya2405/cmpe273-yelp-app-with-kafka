const express = require('express');

const router = express.Router();
const kafka = require('./kafka/client');
const { checkAuth } = require('../config/passport');

router.get('/events', checkAuth, (req, res) => {
  console.log(req.query);
  let ids = [];
  if (req.query.idList) {
    ids = req.query.idList;
  }
  const payload = {
    id: req.query.id,
    category: req.query.category,
    ids,
  };

  kafka.make_request('view_rest_events_request', 'view_rest_events_response', payload, function (err, results) {
    console.log(`In Backend Routes RestEvents.js - events : Results - ${JSON.stringify(results)}`);
    if (err) {
      res.send(err);
    } else {
      res.send(results);
    }
  });
});

module.exports = router;

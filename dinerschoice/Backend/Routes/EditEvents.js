const express = require('express');

const router = express.Router();
const kafka = require('./kafka/client');
const { checkAuth } = require('../config/passport');

router.post('/eventsUpdate', checkAuth, (req, res) => {
  console.log(req.body);
  const payload = {
    id: req.body.restID,
    updateList: req.body.updateList,
    deleteIds: req.body.deleteIds,
  };
  console.log('payload', payload);

  kafka.make_request('add_rest_events_request', 'add_rest_events_response', payload, function (err, results) {
    console.log(`In Backend Routes EditMenu.js - menu : Results - ${JSON.stringify(results)}`);
    if (err) {
      res.send(err);
    } else {
      res.send(results);
    }
  });
});

module.exports = router;

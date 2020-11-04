const express = require('express');

const router = express.Router();
const kafka = require('./kafka/client');
// const { checkAuth } = require('../config/passport');

router.get('/getrestaurantOrders', (req, res) => {
  console.log(req.query);
  const payload = {
    id: req.query.restID,
  };

  kafka.make_request('view_order_request', 'view_order_response', payload, function (err, results) {
    console.log(`In Backend Routes RestOrders.js - profile : Results - ${JSON.stringify(results)}`);
    if (err) {
      res.send(err);
    } else {
      res.send(results);
    }
  });
});

module.exports = router;

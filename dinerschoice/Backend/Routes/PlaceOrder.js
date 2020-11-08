const express = require('express');

const router = express.Router();
const kafka = require('./kafka/client');
const { checkAuth } = require('../config/passport');
// TODO: add details to payload
router.post('/placeOrder', checkAuth, (req, res) => {
  console.log(req.body);
  const { order } = req.body;
  const payload = { ...order };
  console.log(payload);

  kafka.make_request('place_order_request', 'place_order_response', payload, function (err, results) {
    console.log(`In Backend Routes PlaceOrder.js - orders : Results - ${JSON.stringify(results)}`);
    if (err) {
      res.send(err);
    } else {
      res.send(results);
    }
  });
});

module.exports = router;

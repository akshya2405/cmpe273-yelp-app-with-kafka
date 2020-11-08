const express = require('express');

const router = express.Router();
const kafka = require('./kafka/client');
const { checkAuth } = require('../config/passport');

router.post('/updateOrderStatus', checkAuth, (req, res) => {
  console.log(req.body);
  const { order } = req.body;
  const payload = { ...order };
  console.log(payload);

  kafka.make_request('update_order_request', 'update_order_response', payload, function (err, results) {
    console.log(`In Backend Routes UpdateOrderStatus.js - orders : Results - ${JSON.stringify(results)}`);
    if (err) {
      res.send(err);
    } else {
      res.send(results);
    }
  });
});

module.exports = router;

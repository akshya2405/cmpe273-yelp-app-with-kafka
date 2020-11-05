const express = require('express');

const router = express.Router();
const kafka = require('./kafka/client');
// const { checkAuth } = require('../config/passport');

router.post('/lookup', (req, res) => {
  console.log(req.body);
  const payload = {
    searchToken: req.body.lookupParams.searchToken.trim(),
  };

  kafka.make_request('lookup_request', 'lookup_response', payload, function (err, results) {
    console.log(`In Backend Routes LookupService.js - restaurants : Results - ${JSON.stringify(results)}`);
    if (err) {
      res.send(err);
    } else {
      res.send(results);
    }
  });
});

module.exports = router;

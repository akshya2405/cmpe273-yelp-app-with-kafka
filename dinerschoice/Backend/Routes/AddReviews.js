const express = require('express');

const router = express.Router();
const kafka = require('./kafka/client');
const { checkAuth } = require('../config/passport');
// TODO: add details to payload
router.post('/addReview', checkAuth, (req, res) => {
  console.log(req.body);
  const { review } = req.body;
  const payload = { ...review };
  console.log('in add reviews: ', payload);

  kafka.make_request('add_reviews_request', 'add_reviews_response', payload, function (err, results) {
    console.log(`In Backend Routes AddReviews.js - review : Results - ${JSON.stringify(results)}`);
    if (err) {
      res.send(err);
    } else {
      res.send(results);
    }
  });
});

module.exports = router;

const express = require('express');

const router = express.Router();
const kafka = require('./kafka/client');
const { checkAuth } = require('../config/passport');

router.post('/menuUpdate', (req, res) => {
  console.log(req.body);
  const payload = {
    id: req.body.restID,
    updateList: req.body.updateList,
    deleteIds: req.body.deleteIds,
  };

  kafka.make_request('edit_menu_request', 'edit_menu_response', payload, function (err, results) {
    console.log(`In Backend Routes EditMenu.js - menu : Results - ${JSON.stringify(results)}`);
    if (err) {
      res.send(err);
    } else {
      res.send(results);
    }
  });
});

module.exports = router;

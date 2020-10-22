const express = require('express');
const bcrypt = require('bcryptjs');

const router = express.Router();
const jwt = require('jsonwebtoken');
const Users = require('../Models/UserModel');
const { auth } = require('../config/passport');
const { secret } = require('../config/auth.config');

auth();

router.post('/login', (req, res) => {
  console.log('in post request login');
  Users.findOne({
    category: req.body.category,
    email: req.body.email,
  }, (error, user) => {
    if (error) {
      res.status(500).end('Error occured');
    }
    if (user) {
      console.log('in user if');
      console.log(user);
      console.log(bcrypt.compareSync(req.body.password, user.password));
      if (bcrypt.compareSync(req.body.password, user.password)) {
        console.log('matched!!');
        const payload = { category: user.category, email: user.email };
        const token = jwt.sign(payload, secret, { expiresIn: 86400 });
        res.status(200).end(`JWT ${token}`);
      } else {
        res.status(401).end('Invalid credentials');
      }
    } else {
      console.log('in user else');
      res.status(401).end('Invalid credentials');
    }
  });
});

module.exports = router;

const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { secret } = require('../../Backend/config/auth.config');
const { auth } = require('../../Backend/config/passport');

function handle_login(msg, db, callback) {
  let res ={};
  console.log('in post request login');
  console.log(msg.category);
        const users = db.collection('users');
        users.findOne({ category: msg.category, email: msg.email }, function (error, user) {
            if (error) {
                console.log(error);
                res.status = 500
                res.message = 'Error occurred';
                callback(null, res);
            }
            if (user) {
                console.log('in user if');
                console.log(user);
                console.log(bcrypt.compareSync(msg.password, user.password));
                if (bcrypt.compareSync(msg.password, user.password)) {
                    console.log('matched!!');
                    const payload = { category: user.category, email: user.email, id: user._id };
                    const token = jwt.sign(payload, secret, { expiresIn: '10d' });
                    res.status = 200;
                    res.data = `JWT ${token}`;
                    callback(null, res);
                } else {
                    console.log('in else');
                    res.status = 401;
                    res.data.message = 'Invalid credentials';
                    callback(null, res);
                }
            } else {
                console.log('in else');
                res.status = 401;
                res.message = 'Invalid credentials';
                callback(null, res);
            }
        });
  console.log('finishing up find one');
}

exports.handle_login = handle_login;
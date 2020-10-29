const JwtStrategy = require('passport-jwt').Strategy;
const { ExtractJwt } = require('passport-jwt').ExtractJwt;
const passport = require('passport');
const Users = require('../../kafka-backend/services/Models/UserModel');
const { secret } = require('./auth.config');

// Setup work and export for the JWT passport strategy
function auth() {
  const opts = {
    jwtFromRequest: ExtractJwt.fromAuthHeaderWithScheme('jwt'),
    secretOrKey: secret,
  };
  passport.use(
    new JwtStrategy(opts, (jwt_payload, callback) => {
      const { email } = jwt_payload;
      Users.find(email, (err, results) => {
        if (err) {
          return callback(err, false);
        }
        if (results) {
          callback(null, results);
        } else {
          callback(null, false);
        }
      });
    }),
  );
}

exports.auth = auth;
exports.checkAuth = passport.authenticate(`jwt`, { session: false });

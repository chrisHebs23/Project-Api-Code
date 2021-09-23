const passport = require("passport");
const Strategy = require("passport-local");
const bcrypt = require("bcrypt");
const db = require("./db");
const flash = require("connect-flash");

module.exports = function () {
  passport.use(
    new Strategy(function (username, password, cb) {
      db.query(
        "SELECT * FROM users WHERE username = $1",
        [username],
        (err, results) => {
          if (err) {
            return cb(err);
          }
          if (!results) {
            return cb(null, false, {
              message: "Incorrect username or password.",
            });
          }

          bcrypt.compare(password, results.rows[0].password, (err, hash) => {
            if (err) {
              return cb(err);
            }
            if (!hash) {
              return cb(
                null,
                false,
                flash("loginMessage", "Wrong Password or Username")
              );
            } else {
              user = results.rows[0];
              return cb(null, user);
            }
          });
        }
      );
    })
  );

  passport.serializeUser(function (user, cb) {
    cb(null, user);
  });

  passport.deserializeUser(function (user, cb) {
    cb(null, user);
  });
};

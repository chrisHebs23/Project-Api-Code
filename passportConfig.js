const passport = require("passport");
const Strategy = require("passport-local");
const bcrypt = require("bcrypt");
const db = require("./db");
const flash = require("connect-flash");

module.exports = () => {
  passport.use(
    new Strategy(function (username, password, cb) {
      db.query(
        "SELECT * FROM admin WHERE adminname = $1",
        [username],
        async (err, results) => {
          if (err) {
            return cb(err);
          }
          if (!results) {
            await db.query(
              `SELECT * FROM users WHERE username = $1`,
              [username],
              (error, result) => {
                if (error) {
                  return cb(error);
                }
                if (!result) {
                  return cb(null, false, {
                    message: "Wrong Password or Username",
                  });
                }
                bcrypt.compare(
                  password,
                  results.rows[0].password,
                  (err, hash) => {
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
                  }
                );
              }
            );
          }
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

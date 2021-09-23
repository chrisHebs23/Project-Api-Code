const Router = require("express-promise-router");
const db = require("../db");
const bcrypt = require("bcrypt");
const passport = require("passport");
const flash = require("connect-flash");

const router = new Router();

module.exports = router;

// register for app
/**
 * @swagger
 * /auth/register:
 *  post:
 *    summary: Registers a new user
 *    description: Registers a new user
 *    produces:
 *      - application/json
 *    parameters:
 *    responses:
 *      201:
 *        description: 201 Created
 *      409:
 *        description: 409 Conflict
 *      400:
 *        description: 400 Error
 */
router.post("/register", async (req, res, next) => {
  try {
    const { username, email, password } = req.body;
    const duplicateUser = await db.query(
      "SELECT * FROM users WHERE username = $1",
      [username]
    );
    const duplicateEmail = await db.query(
      "SELECT * FROM users WHERE email = $1",
      [email]
    );

    if (duplicateUser.rows[0]) {
      console.log;
      res.status(409).send("Username already exists");
    } else if (duplicateEmail.rows[0]) {
      res.status(409).send("Email already exists");
    } else {
      const hashedPassword = await bcrypt.hash(password, 11);
      const results = await db.query(
        "INSERT INTO users (username, email, password) VALUES($1, $2, $3) RETURNING *",
        [username, email, hashedPassword]
      );
      res.status(201).send(results.rows[0]);
    }
  } catch (error) {
    throw error;
  }
});

router.get("/login", (req, res) => {
  res.render("login", { message: req.flash("loginMessage") });
});

// login
/**
 * @swagger
 * /auth/login:
 *  post:
 *    summary: Login an existing user
 *    description: Login an existing user
 *    produces:
 *      - application/json
 *    parameters:
 *    responses:
 *      200:
 *        description: 200 Created
 *      400:
 *        description: 400 Error
 */
router.post(
  "/login",
  passport.authenticate("local", {
    successRedirect: "/user/profile",
    failureRedirect: "/auth/login",
    failureFlash: true,
  })
);

//logout
/**
 * @swagger
 * /auth/logout:
 *  get:
 *    summary: Logs a user out
 *    description: Logs a user out
 *    produces:
 *      - application/json
 *    parameters:
 *    responses:
 *      200:
 *        description: 200 Logged out
 *      400:
 *        description: 400 Error
 */
router.get("/logout", (req, res) => {
  req.logout();
  res.redirect("/");
});

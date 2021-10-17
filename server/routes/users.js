const Router = require("express-promise-router");
const db = require("../db");

const router = new Router();

module.exports = router;

const authCheck = (req, res, next) => {
  if (!req.user) {
    res.redirect("/auth/login");
  } else {
    next();
  }
};

/**
 * @swagger
 * /user/profile:
 *  get:
 *    summary: Gets users profile
 *    description: Gets users profile
 *    produces:
 *      - application/json
 *    parameters:
 *    responses:
 *      200:
 *        description: 200 Success
 *      400:
 *        description: 400 Error
 */
router.get("/profile", authCheck, (req, res) => {
  const { username, email, id } = req.user;
  res.status(200).send(`Hello ${username}
  id: ${id}  
  email: ${email}
  `);
});

const e = require("connect-flash");
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
 * /order:
 *  get:
 *    summary: Gets users order
 *    description: Gets users order
 *    produces:
 *      - application/json
 *    parameters:
 *    responses:
 *      200:
 *        description: 200 Success
 *      400:
 *        description: 400 Error
 */
router.get("/", async (req, res) => {
  try {
    const user = 14;
    const orders = await db.query("SELECT * FROM orders WHERE userid = $1", [
      user,
    ]);
    if (!orders.rows[0]) {
      res.send("No orders found");
    } else {
      res.json(orders.rows);
    }
  } catch (error) {
    res.send(error);
  }
});

/**
 * @swagger
 * /order/{orderId}:
 *  get:
 *    summary: Gets users order items
 *    description: Gets users order items
 *    produces:
 *      - application/json
 *    parameters:
 *    responses:
 *      200:
 *        description: 200 Success
 *      400:
 *        description: 400 Error
 */
router.get("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const orders = await db.query(
      "SELECT * FROM orderitems WHERE orderid = $1",
      [id]
    );

    if (!orders.rows[0]) {
      res.send("No orders found");
    } else {
      res.json(orders.rows);
    }
  } catch (error) {
    res.send(error);
  }
});

/**
 * @swagger
 * /order/{orderId}:
 *  delete:
 *    summary: Deletes users order
 *    description: Deletes users order
 *    produces:
 *      - application/json
 *    parameters:
 *    responses:
 *      200:
 *        description: 200 Success
 *      400:
 *        description: 400 Error
 */
router.delete("/:id", async (req, res) => {
  const { id } = req.params;

  const target = await db.query("SELECT * FROM orders WHERE id = $1", [id]);

  if (!target.rows[0]) {
    res.send("Order not found try again later");
  } else {
    await db.query("DELETE FROM orders WHERE id = $1", [id], (err, results) => {
      if (err) {
        res.send(err);
      } else {
        res.send("Order Deleted");
      }
    });
  }
});

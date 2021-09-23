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

const cartItem = async (id, productid, qty, price, name, res) => {
  await db.query(
    `INSERT INTO cartitems (cartid, productid, qty, price, name) 
    VALUES($1, $2, $3, $4, $5)`,
    [id, productid, qty, price, name],
    (err, result) => {
      if (err) {
        res.send(err);
      } else {
        res.send(result.rows);
      }
    }
  );
};

const orderitems = async (cartId, id, res) => {
  await db.query(
    `SELECT qty, price, productid, name FROM cartitems WHERE cartid = $1`,
    [cartId],
    async (error, results) => {
      if (error) {
        res.send(error);
      } else {
        for (let i = 0; i < results.rows.length; i++) {
          await db.query(
            `INSERT INTO orderitems (orderid, qty, price, productid, name)
            VALUES ($1, $2, $3, $4, $5)`,
            [
              id,
              results.rows[i].qty,
              results.rows[i].price,
              results.rows[i].productid,
              results.rows[i].name,
            ],
            (results) => {
              res.send(results);
            }
          );
        }
      }
    }
  );
};

/**
 * @swagger
 * /cart:
 *  get:
 *    summary: Gets users cart
 *    description: Gets users cart
 *    produces:
 *      - application/json
 *    parameters:
 *    responses:
 *      200:
 *        description: 200 Success
 *      400:
 *        description: 400 Error
 */
router.get("/", authCheck, async (req, res) => {
  const { id } = req.user;
  const results = await db.query(
    "SELECT product, quantity, total_price FROM cart WHERE user_id = $1",
    [id]
  );
  if (!results) {
    res.send("Cart is Empty");
  } else {
    res.status(200).json(results.rows);
  }
});

/**
 * @swagger
 * /cart:
 *  post:
 *    summary: Creates a new cart
 *    description: Creates a new cart
 *    produces:
 *      - application/json
 *    parameters:
 *    responses:
 *      200:
 *        description: 200 Success
 *      400:
 *        description: 400 Error
 */
router.post("/", async (req, res) => {
  try {
    const id = 15;
    const { productid, qty } = req.body;
    await db.query(
      `INSERT INTO carts(userid)
      VALUES ($1) RETURNING *`,
      [id],
      async (err, result) => {
        if (err) {
          res.send(err);
        } else {
          const { id } = result.rows[0];
          cartItem(id, productid, qty, res);
        }
      }
    );
  } catch (error) {
    res.send(error);
  }
});

/**
 * @swagger
 * /cart/{cartId}:
 *  post:
 *    summary: Adds items to cart
 *    description: Adds items to cart
 *    produces:
 *      - application/json
 *    parameters:
 *    responses:
 *      204:
 *        description: 200 Success
 *      400:
 *        description: 400 Error
 */
router.post("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const { productid, qty, price, name } = req.body;
    cartItem(id, productid, qty, price, name, res);
  } catch (error) {
    res.send(error);
  }
});

/**
 * @swagger
 * /cart/{cartId}/checkout:
 *  post:
 *    summary: Creates a new order
 *    description: Creates a new order
 *    produces:
 *      - application/json
 *    parameters:
 *    responses:
 *      204:
 *        description: 200 Success
 *      400:
 *        description: 400 Error
 */
router.post("/:id/checkout", async (req, res) => {
  try {
    const userid = 15;
    const cartId = req.params.id;
    const { total } = req.body;
    await db.query(
      `INSERT INTO orders(userid, total) 
        VALUES($1, $2) RETURNING * `,
      [userid, total],
      async (error, result) => {
        if (!result) {
          res.send("error");
        } else {
          const { id } = result.rows[0];

          orderitems(cartId, id, res);
        }
      }
    );
  } catch (error) {
    res.send(error);
  }
});

/**
 * @swagger
 * /cart/{cartId}:
 *  delete:
 *    summary: Deletes cart
 *    description: Deletes cart
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

  const target = await db.query("SELECT * FROM cart WHERE id = $1", [id]);

  if (!target.rows[0]) {
    res.send("Cart not found try again later");
  } else {
    await db.query("DELETE FROM cart WHERE id = $1", [id], (err, results) => {
      if (err) {
        res.send(err);
      } else {
        res.send("Cart Deleted");
      }
    });
  }
});

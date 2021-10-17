const Router = require("express-promise-router");
const db = require("../db");

const router = new Router();

module.exports = router;

//search for product

/**
 * @swagger
 * /products/search:
 *  get:
 *    summary: Search for products
 *    description: Search for products
 *    produces:
 *      - application/json
 *    parameters:
 *    responses:
 *      200:
 *        description: 200 Success
 *      404:
 *        description: 404 Not found
 *      400:
 *        description: 400 Error
 */
router.get("/search", async (req, res) => {
  const { find } = req.query;
  const productsFound = await db.query(
    "SELECT product, price, quantity FROM products WHERE product ILIKE '%' || $1 || '%'",
    [find]
  );
  if (!productsFound) {
    res.status(404).send(`No products matching search: '${find}'`);
  } else {
    res.status(200).json(productsFound.rows);
  }
});

// get products
/**
 * @swagger
 * /products:
 *  get:
 *    summary: Get all the products
 *    description: Get all the products
 *    produces:
 *      - application/json
 *    parameters:
 *    responses:
 *      200:
 *        description: 200 Success
 *      404:
 *        description: 404 Not found
 *      400:
 *        description: 400 Error
 */
router.get("/", async (req, res) => {
  const products = await db.query("SELECT * FROM products");
  if (!products) {
    res.status(400).send("No products found");
  } else {
    res.status(200).json(products.rows);
  }
});

// get product by id
/**
 * @swagger
 * /products/{productId}:
 *  get:
 *    summary: Gets products by product Id
 *    description: Gets products by product Id
 *    produces:
 *      - application/json
 *    parameters:
 *    responses:
 *      200:
 *        description: 200 Success
 *      404:
 *        description: 404 Not found
 *      400:
 *        description: 400 Error
 */
router.get("/:id", async (req, res) => {
  const { id } = req.params;
  const product = await db.query("SELECT * FROM products WHERE id = $1", [id]);
  if (!product) {
    res.status(400).send("No products found");
  } else {
    res.status(200).send(product.rows);
  }
});

const auth = require("./auth");
const users = require("./users");
const products = require("./products");
const cart = require("./cart");
const order = require("./order");

module.exports = (app) => {
  app.use("/auth", auth);
  app.use("/user", users);
  app.use("/products", products);
  app.use("/cart", cart);
  app.use("/order", order);
};

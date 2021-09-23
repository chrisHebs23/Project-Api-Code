const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const session = require("express-session");
const passport = require("passport");
const flash = require("connect-flash");
const swaggerJSDoc = require("swagger-jsdoc");
const PORT = process.env.PORT || 3000;

const mountRoutes = require("./routes");

const db = require("./db");

//create server
const app = express();

app.set("view engine", "ejs");

app.use(
  session({
    secret: "keyboard cat",
    resave: false,
    saveUninitialized: true,
    cookie: { maxAge: 60 * 60 * 1000 },
  })
);

const swaggerDefinition = {
  info: {
    title: "Node Swagger API",
    version: "1.0.0",
    description: "Demonstrating how to describe a RESTful API with Swagger",
  },
  host: "localhost:3000",
  basePath: "/",
};

// options for the swagger docs
var options = {
  // import swaggerDefinitions
  swaggerDefinition: swaggerDefinition,
  // path to the API docs
  apis: ["./routes/*.js"],
};

// initialize swagger-jsdoc
var swaggerSpec = swaggerJSDoc(options);

require("./passportConfig")(passport);
app.use(passport.initialize());
app.use(passport.session());

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cors());
app.use(flash());

// if (process.env.NODE_ENV === "production") {
//   app.use(express.static(__dirname));
// }

app.get("/", (req, res) => {
  res.send("Hello");
});

mountRoutes(app);

app.get("/swagger.json", function (req, res) {
  res.setHeader("Content-Type", "application/json");
  res.send(swaggerSpec);
});

/**
 * @swagger
 * /profile:
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
app.get("/profile", (req, res) => {
  res.send("Welcome", { user: req.user });
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

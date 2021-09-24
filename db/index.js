const { Pool } = require("pg");
require("dotenv").config();
const { Client } = require("pg");

const devConfig = `postgresql://${process.env.DB_USER}:${process.env.DB_PASSWORD}@${process.env.DB_HOST}:${process.env.DB_DATABASE}
/${process.env.DB_PORT}`;

const proConfig = process.env.DATABASE_URL;

const pool = new Pool({
  connectionString:
    process.env.NODE_ENV === "production" ? proConfig : devConfig,
});

const client = new Client({
  connectionString:
    process.env.DATABASE_URL ||
    "postgresql://postgres:postgres@localhost:5432/projectapi",
  ssl: process.env.DATABASE_URL ? true : false,
});

client.connect();

client.query(
  "SELECT table_schema table_name FROM information_schema.tables;",
  (err, res) => {
    if (err) throw err;
    for (let row of res.rows) {
      console.log(row);
    }
    client.end();
  }
);

module.exports = {
  query: (text, params, callback) => {
    return pool.query(text, params, callback);
  },
};

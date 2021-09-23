const db = require("../db");
const pgp = require("pg-promise");

module.exports = (data) => {
  // create a new user
  const create = async (data) => {
    try {
      const { username, email, password } = data;
      const hashedPassword = await bcrypt.hash(password, 11);
      const results = await db.query(
        "INSERT INTO users (username, email, password) VALUES($1, $2, $3) RETURNING *",
        [username, email, hashedPassword]
      );

      return results.rows[0];
    } catch (error) {}
  };

  // find a users email
  const findByEmail = async (email) => {
    try {
      const results = await db.query("SELECT * FROM users WHERE email = $1", [
        email,
      ]);

      if (results.rows[0]) {
        return results.row[0];
      }

      return null;
    } catch (error) {
      throw error;
    }
  };
};

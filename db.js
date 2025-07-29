const { Pool } = require("pg");

const pool = new Pool({
  user: "postgres",
  host: "localhost",
  database: "quizapp",
  password: "jAy230403",
  port: 5432,
});

module.exports = {
  query: (text, params) => pool.query(text, params),
};

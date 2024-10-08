const { Pool } = require("pg");

const pool = new Pool({
  host: "localhost",
  user: "postgres",
  password: "cinematica",
  database: "likeme",
  allowExitOnIdle: true,
});

const getPosts = async () => {
  const { rows } = await pool.query("SELECT * FROM posts ORDER BY id ASC");
  return rows;
};

module.exports = { getPosts, pool };

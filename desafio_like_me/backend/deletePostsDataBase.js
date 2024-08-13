const { pool } = require("./getPostsDataBase");

const deletePosts = async (id) => {
  const consulta = "DELETE FROM posts WHERE id = $1";
  const values = [id];
  await pool.query(consulta, values);
};

module.exports = { deletePosts };

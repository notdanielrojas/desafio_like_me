const { pool } = require("./getPostsDataBase");

const updateLikes = async (id, likes) => {
  const consulta = "UPDATE posts SET likes = $1 WHERE id = $2";
  const values = [likes, id];
  await pool.query(consulta, values);
};

module.exports = { updateLikes };

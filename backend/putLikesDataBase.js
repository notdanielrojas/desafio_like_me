const { pool } = require("./getPostsDataBase");

const updateLikes = async (id, likes, updates) => {
  const { titulo, img, descripcion } = updates;

  const result = await pool.query("SELECT * FROM posts WHERE id = $1", [id]);

  const currentPost = result.rows[0];

  const newLikes = likes === undefined ? currentPost.likes + 1 : likes;

  await pool.query(
    "UPDATE posts SET likes = $1, titulo = COALESCE($2, titulo), img = COALESCE($3, img), descripcion = COALESCE($4, descripcion) WHERE id = $5",
    [newLikes, titulo, img, descripcion, id]
  );
};

module.exports = { updateLikes };

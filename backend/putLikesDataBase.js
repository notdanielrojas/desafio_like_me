const { pool } = require("./getPostsDataBase");

const updateLikes = async (id, likes, updates) => {
  const { titulo, img, descripcion } = updates;

  const result = await pool.query("SELECT * FROM posts WHERE id = $1", [id]);

  const currentPost = result.rows[0];
  if (!currentPost) {
    throw new Error("Post no encontrado");
  }

  const currentLikes = currentPost.likes === null ? 0 : currentPost.likes;
  const newLikes = likes === undefined ? currentLikes + 1 : likes;

  await pool.query(
    "UPDATE posts SET likes = $1, titulo = COALESCE($2, titulo), img = COALESCE($3, img), descripcion = COALESCE($4, descripcion) WHERE id = $5",
    [newLikes, titulo, img, descripcion, id]
  );
};

module.exports = { updateLikes };

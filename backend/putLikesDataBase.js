const { pool } = require("./getPostsDataBase");

const updateLikes = async (id, likes, updates) => {
  const { titulo, img, descripcion } = updates;

  const result = await pool.query("SELECT * FROM posts WHERE id = $1", [id]);

  const currentPost = result.rows[0];

  let currentLikes = currentPost.likes;
  if (currentLikes === null) {
    currentLikes = 0;
  }

  let newLikes;
  if (likes === undefined) {
    newLikes = currentLikes + 1;
  } else {
    newLikes = likes;
  }

  const query = `
    UPDATE posts 
    SET 
      likes = $1, 
      titulo = COALESCE($2, titulo), 
      img = COALESCE($3, img), 
      descripcion = COALESCE($4, descripcion) 
    WHERE id = $5
  `;

  await pool.query(query, [newLikes, titulo, img, descripcion, id]);
};

module.exports = { updateLikes };

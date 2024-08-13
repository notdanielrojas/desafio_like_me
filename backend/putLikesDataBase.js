const { pool } = require("./getPostsDataBase");

const updateLikes = async (id, likes) => {
  if (likes === undefined) {
    const result = await pool.query("SELECT likes FROM posts WHERE id = $1", [
      id,
    ]);

    const currentLikes = result.rows[0].likes;
    const newLikes = currentLikes + 1;

    await pool.query("UPDATE posts SET likes = $1 WHERE id = $2", [
      newLikes,
      id,
    ]);
  } else {
    await pool.query("UPDATE posts SET likes = $1 WHERE id = $2", [likes, id]);
  }
};

module.exports = { updateLikes };

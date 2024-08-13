const { pool } = require("./getPostsDataBase");

const postPosts = async (titulo, url, descripcion) => {
  const consulta = "INSERT INTO posts values (DEFAULT, $1, $2, $3)";
  const values = [titulo, url, descripcion];
  await pool.query(consulta, values);
  return "Post agregado correctamente";
};

module.exports = { postPosts };

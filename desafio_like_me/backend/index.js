const { getPosts } = require("./getPostsDataBase");
const { postPosts } = require("./postPostsDataBase");
const { deletePosts } = require("./deletePostsDataBase");
const express = require("express");
const cors = require("cors");
const app = express();

app.use(express.json());
app.use(cors());

app.listen(3000, console.log("SERVIDOR ENCENDIDO"));

app.get("/posts", async (req, res) => {
  try {
    const posts = await getPosts();
    res.send(posts);
  } catch (error) {
    res.status(500).send("Error al obtener la información");
  }
});

app.post("/posts", async (req, res) => {
  try {
    const { titulo, url, descripcion } = req.body;
    await postPosts(titulo, url, descripcion);
    res.send("Post agregado con éxito");
  } catch (error) {
    res.status(500).send("Error al agregar el post");
  }
});

app.delete("/posts/:id", async (req, res) => {
  try {
    const { id } = req.params;
    await deletePosts(id);
    res.send("Post eliminado con éxito");
  } catch (error) {
    res.status(500).send("Error al eliminar el post");
  }
});

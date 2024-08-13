const { getPosts } = require("./getPostsDataBase");
const { postPosts } = require("./postPostsDataBase");
const { updateLikes } = require("./putLikesDataBase");
const { deletePosts } = require("./deletePostsDataBase");
const { handleErrors } = require("./handleErrors");
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
    const errorResponse = handleErrors(error.code || 500);
    res.status(errorResponse.status).send(errorResponse.message);
  }
});

app.post("/posts", async (req, res) => {
  try {
    const { titulo, url, descripcion } = req.body;
    await postPosts(titulo, url, descripcion);
    res.send("Post agregado con éxito");
  } catch (error) {
    const errorResponse = handleErrors(error.code || 500);
    res.status(errorResponse.status).send(errorResponse.message);
  }
});

app.put("/posts/like/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const { likes, titulo, img, descripcion } = req.body;
    await updateLikes(id, likes, { titulo, img, descripcion });
    res.send("Post modificado con éxito");
  } catch (error) {
    const errorResponse = handleErrors(error.code || 500);
    res.status(errorResponse.status).json({ error: errorResponse.message });
  }
});

app.delete("/posts/:id", async (req, res) => {
  try {
    const { id } = req.params;
    await deletePosts(id);
    res.send("Post eliminado con éxito");
  } catch (error) {
    const errorResponse = handleErrors(error.code || 500);
    res.status(errorResponse.status).send(errorResponse.message);
  }
});

app.use("*", (req, res) => {
  res.json({ ok: false, result: "404 Pagina no Encontrada" });
});

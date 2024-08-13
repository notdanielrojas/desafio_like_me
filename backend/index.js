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
    const result = await getPosts();
    return res
      .status(200)
      .json({ ok: true, message: "Posts obtenidos con éxito", result });
  } catch (error) {
    const { status, message } = handleErrors(error.code);
    return res.status(status).json({ ok: false, result: message });
  }
});

app.post("/posts", async (req, res) => {
  try {
    const { titulo, url, descripcion } = req.body;
    const result = await postPosts(titulo, url, descripcion);
    return res
      .status(201)
      .json({ ok: true, message: "Post agregado con éxito", result });
  } catch (error) {
    const { status, message } = handleErrors(error.code);
    return res.status(status).json({ ok: false, result: message });
  }
});

app.put("/posts/like/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const { likes } = req.body;
    const result = await updateLikes(id, likes);
    return res.status(200).json({
      success: true,
      message: "Post modificado con éxito",
      result,
    });
  } catch (error) {
    const { status, message } = handleErrors(error.code);
    return res
      .status(status)
      .json({ ok: false, result: message + " : " + error.column });
  }
});

app.delete("/posts/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const result = await deletePosts(id);
    return res.status(200).json({
      success: true,
      message: "Post eliminado con éxito",
      id: result,
    });
  } catch (error) {
    const { status, message } = handleErrors(error.code);
    return res.status(status).json({ ok: false, result: message });
  }
});

app.use("*", (req, res) => {
  res.json({ ok: false, result: "404 Pagina no Encontrada" });
});

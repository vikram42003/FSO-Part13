const { Router } = require("express");

const { Blog } = require("../models");

const blogRouter = Router();

blogRouter.get("/", async (req, res) => {
  const blogs = await Blog.findAll();
  res.json(blogs);
});

blogRouter.post("/", async (req, res) => {
  try {
    const blog = await Blog.create(req.body);
    res.json(blog);
  } catch (error) {
    console.log(error);
    res.status(400).json({ error: error.message });
  }
});

blogRouter.patch("/:id", async (req, res) => {
  try {
    const blog = await Blog.findByPk(req.params.id);
    if (!blog) throw new Error("Invalid id");
    blog.likes += 1;
    await blog.save();
    res.json(blog);
  } catch (error) {
    console.log(error);
    if (error.message) {
      res.status(400).json({ error: error.message });
    }
  }
});

blogRouter.delete("/:id", async (req, res) => {
  try {
    const wasItDeleted = await Blog.destroy({
      where: {
        id: req.params.id,
      },
    });
    if (wasItDeleted === 0) throw new Error("Invalid id");
    res.sendStatus(200);
  } catch (error) {
    console.log(error);
    if (error.message) {
      res.status(400).json({ error: error.message });
    }
  }
});

module.exports = blogRouter;

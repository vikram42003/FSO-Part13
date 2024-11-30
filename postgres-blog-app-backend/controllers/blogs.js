const { Router } = require("express");

const { Blog } = require("../models");

const blogRouter = Router();

blogRouter.get("/", async (req, res) => {
  const blogs = await Blog.findAll();
  res.json(blogs);
});

blogRouter.post("/", async (req, res) => {
  const blog = await Blog.create(req.body);
  res.json(blog);
});

blogRouter.patch("/:id", async (req, res) => {
  const blog = await Blog.findByPk(req.params.id);
  if (!blog) throw new Error("Invalid id");
  blog.likes += 1;
  await blog.save();
  res.json(blog);
});

blogRouter.delete("/:id", async (req, res) => {
  const wasItDeleted = await Blog.destroy({
    where: {
      id: req.params.id,
    },
  });
  if (wasItDeleted === 0) throw new Error("Invalid id");
  res.sendStatus(200);
});

module.exports = blogRouter;

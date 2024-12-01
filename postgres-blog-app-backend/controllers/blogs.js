const { Router } = require("express");

const { Blog, User } = require("../models");

const { extractUser } = require("../utils/middleware");
const { Op } = require("sequelize");

const blogRouter = Router();

blogRouter.get("/", async (req, res) => {
  let where = {};
  if (req.query.search) {
    where = {
      [Op.or]: [
        { title: { [Op.iLike]: "%" + req.query.search + "%" } },
        { author: { [Op.iLike]: "%" + req.query.search + "%" } },
      ],
    };
  }

  const blogs = await Blog.findAll({
    attributes: { exclude: ["userId"] },
    include: {
      model: User,
      attributes: ["name"],
    },
    where,
  });
  res.json(blogs);
});

blogRouter.post("/", extractUser, async (req, res) => {
  const blog = await Blog.create({ ...req.body, userId: req.user.id });
  res.json(blog);
});

blogRouter.patch("/:id", async (req, res) => {
  const blog = await Blog.findByPk(req.params.id);
  if (!blog) throw new Error("Invalid id");
  blog.likes += 1;
  await blog.save();
  res.json(blog);
});

blogRouter.delete("/:id", extractUser, async (req, res) => {
  const blog = await Blog.findByPk(req.params.id);
  if (!blog) {
    throw new Error(`blog with id '${req.params.id}' was not found`);
  }

  if (blog.userId != req.user.id) {
    throw new Error("a blog can only be deleted by its creator and you are not the creator");
  }

  await blog.destroy();
  res.sendStatus(200);
});

module.exports = blogRouter;

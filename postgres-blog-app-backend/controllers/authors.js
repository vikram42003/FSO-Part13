const { Router } = require("express");
const sequelize = require("sequelize");

const { Blog } = require("../models");

const authorRouter = Router();

authorRouter.get("/", async (req, res) => {
  const blogs = await Blog.findAll({
    attributes: [
      "author",
      [sequelize.fn("COUNT", sequelize.col("author")), "articles"],
      [sequelize.fn("SUM", sequelize.col("likes")), "likes"],
    ],
    group: "author",
    order: [["likes", "DESC"]],
  });
  res.json(blogs);
});

module.exports = authorRouter;

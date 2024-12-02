const { Router } = require("express");

const { ReadingList } = require("../models");

const readingListsRouter = Router();

readingListsRouter.post("/", async (req, res) => {
  if (!req.body.userId || !req.body.blogId) {
    throw new Error("userId and/or blogId are missing");
  }

  const readingList = await ReadingList.create(req.body);
  res.json(readingList);
});

module.exports = readingListsRouter;

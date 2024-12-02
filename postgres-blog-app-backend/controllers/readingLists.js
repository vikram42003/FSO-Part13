const { Router } = require("express");

const { ReadingList } = require("../models");

const { extractUser } = require("../utils/middleware");

const readingListsRouter = Router();

readingListsRouter.post("/", async (req, res) => {
  if (!req.body.userId || !req.body.blogId) {
    throw new Error("userId and/or blogId are missing");
  }

  const readingList = await ReadingList.create(req.body);
  res.json(readingList);
});

readingListsRouter.put("/:id", extractUser, async (req, res) => {
  const list = await ReadingList.findByPk(req.params.id);

  if (!list) {
    throw new Error(`reading list with id '${req.params.id}' was not found on the server`);
  } else if (list.userId != req.user.id) {
    throw new Error("reading list can only be change by its creator");
  } else if (!req.body.read || typeof req.body.read != "boolean") {
    throw new Error("the 'read' property is either missing or not boolean");
  }

  list.reading = req.body.read;
  await list.save();
  res.json(list);
});

module.exports = readingListsRouter;

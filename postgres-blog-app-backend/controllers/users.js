const { Router } = require("express");
const bcrypt = require("bcrypt");

const { User } = require("../models");

const userRouter = Router();

userRouter.get("/", async (req, res) => {
  const users = await User.findAll();
  res.json(users);
});

userRouter.post("/", async (req, res) => {
  if (!req.body.name || !req.body.username || !req.body.password) {
    let errMsg = [];
    if (!req.body.name) errMsg.push("name");
    if (!req.body.username) errMsg.push("username");
    if (!req.body.password) errMsg.push("password");
    throw new Error(`${errMsg.join()} is/are missing`);
  }

  const user = await User.create({ ...req.body, password: await bcrypt.hash(req.body.password, 10) });
  user.password = undefined;
  res.json(user);
});

userRouter.put("/:username", async (req, res) => {
  if (!req.body.username) {
    throw new Error("new username is missing");
  }

  const user = await User.findOne({ where: { username: req.params.username } });

  if (!user) {
    throw new Error(`user with username '${req.params.username}' was not found`);
  }

  user.username = req.body.username;
  await user.save();
  res.json(user);
});

module.exports = userRouter;
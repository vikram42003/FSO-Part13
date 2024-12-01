const { Router } = require("express");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

const { User } = require("../models");

const loginRouter = Router();

loginRouter.post("/", async (req, res) => {
  if (!req.body.username || !req.body.password) {
    throw new Error("username or password is missing");
  }

  const user = await User.findOne({
    where: { username: req.body.username },
  });

  if (!user) {
    throw new Error(`user with username '${req.body.username}' does not exist`);
  }

  if (await bcrypt.compare(req.body.password, user.password)) {
    const token = jwt.sign({ username: user.username, id: user.id }, process.env.SECRET);
    res.json({ token, username: user.username, name: user.name });
  } else {
    throw new Error("password is incorrect");
  }
});

module.exports = loginRouter;

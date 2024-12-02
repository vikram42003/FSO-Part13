const { Router } = require("express");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

const { User, Session } = require("../models");

const { extractUser } = require("../utils/middleware");

const loginRouter = Router();

loginRouter.post("/login", async (req, res) => {
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

    const date = new Date();
    // set expiration date to 30 days from creation
    date.setDate(date.getDate() + 30);
    await Session.create({ userId: user.id, expiresAt: date });

    res.json({ token, username: user.username, name: user.name });
  } else {
    throw new Error("password is incorrect");
  }
});

loginRouter.delete("/logout", extractUser, async (req, res) => {
  const deleted = await Session.destroy({ where: { userId: req.user.id } });
  if (!deleted) {
    throw new Error("the session was not found on the server. youre already logged out");
  }
  res.sendStatus(200);
});

module.exports = loginRouter;

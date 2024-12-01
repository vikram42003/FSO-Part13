const jwt = require("jsonwebtoken");
const { User } = require("../models");

// P.S. I know the error handling is absolutely abyssmal but this is a project for
// learning how to work with postgres so my main focus was the rest of the backend
const errorHandler = (error, req, res, next) => {
  if (process.env.NODE_ENV != "production") {
    console.log(error);
  }

  if (error.message) {
    res.status(400).json({ error: error.message });
  } else {
    res.status(400).json({ error: "Unknown error occured" });
  }

  next(error);
};

const extractUser = async (req, res, next) => {
  const authHeader = req.header("Authorization");
  if (!authHeader || !authHeader.toLowerCase().startsWith("bearer ")) {
    throw new Error("authentication token is invalid or missing");
  }

  console.log(authHeader.substring(7));
  const decodedToken = jwt.verify(authHeader.substring(7), process.env.SECRET);

  const user = await User.findByPk(decodedToken.id);
  if (!user) {
    throw new Error(`user does not exist on the server`);
  }

  req.user = user;
  next();
};

module.exports = {
  errorHandler,
  extractUser,
};

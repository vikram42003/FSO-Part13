const express = require("express");
require("express-async-errors");

const { connectToDatabase } = require("./utils/db");
const { errorHandler } = require("./utils/middleware");

const blogRouter = require("./controllers/blogs");
const userRouter = require("./controllers/users");

const app = express();

app.use(express.json());

app.use("/api/blogs", blogRouter);
app.use("/api/users", userRouter);

app.use(errorHandler);

const start = async () => {
  await connectToDatabase();
  const PORT = process.env.port || 3000;
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });
};

start();

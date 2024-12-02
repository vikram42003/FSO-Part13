const express = require("express");
require("express-async-errors");

const { connectToDatabase } = require("./utils/db");
const { errorHandler } = require("./utils/middleware");

const blogRouter = require("./controllers/blogs");
const userRouter = require("./controllers/users");
const loginRouter = require("./controllers/login");
const authorRouter = require("./controllers/authors");
const readingListsRouter = require("./controllers/readingLists");

const app = express();

app.use(express.json());

app.use("/api/blogs", blogRouter);
app.use("/api/users", userRouter);
app.use("/api/", loginRouter);
app.use("/api/authors", authorRouter);
app.use("/api/readinglists", readingListsRouter);

app.use(errorHandler);

const start = async () => {
  await connectToDatabase();
  const PORT = process.env.port || 3000;
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });
};

start();

const express = require("express");
const { connectToDatabase } = require("./utils/db");
const blogRouter = require("./controllers/blogs");
const app = express();

app.use(express.json());

app.use("/api/blogs", blogRouter);

const start = async () => {
  await connectToDatabase();
  const PORT = process.env.port || 3000;
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });
};

start();

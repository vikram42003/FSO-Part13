const { Sequelize, DataTypes } = require("sequelize");

const express = require("express");
const app = express();

app.use(express.json());

const sequelize = new Sequelize(process.env.POSTGRES_URL, {
  dialectOptions: {
    ssl: {
      require: true,
      rejectUnauthorized: false,
    },
  },
});

const Blog = sequelize.define(
  "blog",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    author: {
      type: DataTypes.TEXT,
    },
    url: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    title: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    likes: {
      type: DataTypes.INTEGER,
      defaultValue: 0,
    },
  },
  {
    underscored: true,
    timestamps: false,
  },
);
Blog.sync();

app.get("/api/blogs", async (req, res) => {
  const blogs = await Blog.findAll();
  res.json(blogs);
});

app.post("/api/blogs", async (req, res) => {
  try {
    const blog = await Blog.create(req.body);
    res.json(blog);
  } catch (error) {
    console.log(error);
    res.status(400).json({ error: error.message });
  }
});

app.delete("/api/blogs/:id", async (req, res) => {
  try {
    const wasItDeleted = await Blog.destroy({
      where: {
        id: req.params.id,
      },
    });
    if (wasItDeleted === 0) throw new Error("Invalid id");
    res.sendStatus(200);
  } catch (error) {
    console.log(error);
    if (error.message) {
      res.status(400).json({ error: error.message });
    }
  }
});

const PORT = process.env.port || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

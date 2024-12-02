const Blog = require("./blog");
const User = require("./user");
const ReadingList = require("./readingList");

User.hasMany(Blog);
Blog.belongsTo(User);

User.belongsToMany(Blog, { through: ReadingList, as: "reading" });
Blog.belongsToMany(User, { through: ReadingList, as: "readers" });

module.exports = {
  Blog,
  User,
  ReadingList,
};

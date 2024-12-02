const { DataTypes } = require("sequelize");
const { sequelize } = require("../utils/db");

const ReadingList = sequelize.define(
  "reading_list",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    userId: {
      type: DataTypes.INTEGER,
      references: {
        model: "users",
        key: "id",
      },
      allowNull: false,
    },
    blogId: {
      type: DataTypes.INTEGER,
      references: {
        model: "blogs",
        key: "id",
      },
      allowNull: false,
    },
    reading: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
  },
  {
    underscored: true,
    timestamps: false,
  },
);

module.exports = ReadingList;

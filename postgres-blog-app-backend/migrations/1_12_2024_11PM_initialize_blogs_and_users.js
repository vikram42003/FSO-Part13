const { DataTypes } = require("sequelize");

module.exports = {
  up: async ({ context: queryInterface }) => {
    await queryInterface.createTable(
      "users",
      {
        id: {
          type: DataTypes.INTEGER,
          primaryKey: true,
          autoIncrement: true,
        },
        name: {
          type: DataTypes.TEXT,
          allowNull: false,
        },
        username: {
          type: DataTypes.TEXT,
          unique: true,
          allowNull: false,
          validate: {
            isEmail: true,
          },
        },
        password: {
          type: DataTypes.TEXT,
          allowNull: false,
        },
      },
      {
        underscored: true,
      },
    );
    await queryInterface.createTable(
      "blogs",
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
        user_id: {
          type: DataTypes.INTEGER,
          references: {
            model: "users",
            key: "id",
          },
          allowNull: false,
        },
      },
      {
        underscored: true,
      },
    );
  },
  down: async ({ context: queryInterface }) => {
    await queryInterface.dropTable("blogs");
    await queryInterface.dropTable("users");
  },
};

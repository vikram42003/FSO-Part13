const { Sequelize } = require("sequelize");
const { Umzug, SequelizeStorage } = require("umzug");

const sequelize = new Sequelize(process.env.POSTGRES_URL, {
  dialectOptions: {
    ssl: {
      require: true,
      rejectUnauthorized: false,
    },
  },
});

const runMigrations = async () => {
  const migrator = new Umzug({
    migrations: {
      glob: "migrations/*.js",
    },
    storage: new SequelizeStorage({ sequelize, tableName: "migrations" }),
    context: sequelize.getQueryInterface(),
    logger: console,
  });

  const migrations = await migrator.up();
  console.log("Migrations up to date", {
    files: migrations.map((mig) => mig.name),
  });
};

const connectToDatabase = async () => {
  try {
    await sequelize.authenticate();
    await runMigrations();
    console.log("Connected to database");
  } catch (error) {
    console.log("Could not connect to databse\n", error);
    return process.exit(1);
  }
};

module.exports = {
  sequelize,
  connectToDatabase,
};

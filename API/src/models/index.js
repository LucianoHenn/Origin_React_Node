const dbConfig = require("../config/db.config");

const Sequelize = require("sequelize");
const sequelizeInstance = new Sequelize(
  dbConfig.database,
  dbConfig.user,
  dbConfig.password,
  {
    dialect: "mysql",
    host: dbConfig.host,
  }
);

const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelizeInstance;

db.articles = require("./article.model")(sequelize, Sequelize);

module.exports = db;

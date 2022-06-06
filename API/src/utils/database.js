import Sequelize from "sequelize";
import dbConfig from "../config/db.config";

const sequelize = new Sequelize(
  dbConfig.database,
  dbConfig.user,
  dbConfig.password,
  {
    dialect: "mysql",
    host: dbConfig.host,
  }
);

module.exports = sequelize;

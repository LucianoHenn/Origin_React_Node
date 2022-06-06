// Include Sequelize module.
const Sequelize = require("sequelize");
import User from "./user";

// Import sequelize object,
// Database connection pool managed by Sequelize.
const sequelize = require("../utils/database");
const Stock = sequelize.define(
  "stocks",
  {
    id: {
      type: Sequelize.INTEGER,
      primaryKey: true, // To increment user_id automatically.
      autoIncrement: true,

      // user_id can not be null.
      allowNull: false,
    },
    name: { type: Sequelize.STRING },
    symbol: { type: Sequelize.STRING },
    currency: { type: Sequelize.STRING },
  },
  {
    // dont use createdAt/update
    timestamps: false,
  }
);

Stock.belongsTo(User);

module.exports = Stock;

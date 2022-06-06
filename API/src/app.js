import express from "express";
import morgan from "morgan";
import cors from "cors";
// Routes
import authRoutes from "./routes/auth.routes";
import userRoutes from "./routes/user.routes";
import stockRoutes from "./routes/stock.routes";

const corsOptions = {
  origin: "http://localhost:3000",
};

const app = express();

// Settings
app.set("port", 4000);

// Middlewares
app.use(morgan("dev"));
app.use(express.json());
app.use(cors(corsOptions));

// Routes

app.use("/api", authRoutes);
app.use("/api", userRoutes);
app.use("/api/stock", stockRoutes);

const sequelize = require("./utils/database");
const User = require("./models/user");
const Stock = require("./models/stock");

sequelize
  .authenticate()
  .then(() => {
    console.log("Connection has been established successfully.");
  })
  .catch((err) => {
    console.error("Unable to connect to the database:", err);
  });

// Create all the table defined using
// sequelize in Database

// Force sync all models
// It will drop the table first
// and re-create it afterwards
/* sequelize.sync({ force: true }).then(() => {
  console.log(`Database & tables created!`);
}); */

export default app;

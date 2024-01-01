const express = require("express");
const { Sequelize, DataTypes, where } = require("sequelize");
const bcrypt = require("bcrypt");
const User = require("./models/user");
const port = 8001;

const app = express();

app.use(express.json());

const sequelize = new Sequelize(require("./config/config.json").development);

const auth = require("./src/auth");
const example = require("./src/example");
(async () => {
  try {
    await sequelize.authenticate();
    console.log("Connection has been established successfully.");

    // Synchronize models with the database
    //await sequelize.sync({ alter: true });
    await sequelize.sync({ force: true });
    console.log("All models were synchronized successfully.");
  } catch (error) {
    console.error("Unable to connect to the database:", error);
  }
})();

app.use("/auth", auth);
app.use("/example", example);

app.listen(port, () => {
  console.log("Server running....");
});

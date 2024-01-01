const { DataTypes, Sequelize } = require("sequelize");
const sequelize = new Sequelize(require("../config/config.json").development);

const User = sequelize.define("user", {
  username: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false,
  },
});
User.sync().then(() => {
  console.log("table created");
});
module.exports = User;

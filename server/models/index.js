const config = require("../config/config.js");
const Sequelize = require("sequelize");
const sequelize = new Sequelize(
  config.databaseName,
  config.databaseUser,
  config.databasePassword,
  {
    host: config.databaseHost,
    dialect: config.dialect,
    operatorsAliases: false,
  }
);

const db = {};
db.Sequelize = Sequelize;
db.sequelize = sequelize;
db.callHistory = require("./callHistory.model")(sequelize, Sequelize);
module.exports = db;

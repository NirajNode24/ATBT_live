const { DataTypes } = require('sequelize');
const sequelize = require('../DB/dbconncet');

const db = {};

// db.Sequelize =Sequelize
db.sequelize = sequelize



db.Admin = require('./Admin_model')(sequelize, DataTypes)
db.User = require('./User_model')(sequelize, DataTypes)
db.UserEntite = require('./User_Entite')(sequelize, DataTypes)

db.sequelize.sync({ alter: true });
console.log("All models were alter successfully.");
module.exports = db;
const { DataTypes } = require('sequelize');
const sequelize = require('../DB/dbconncet');

const db = {};

// db.Sequelize =Sequelize
db.sequelize = sequelize


// Importing models
db.Entite = require('./Entite')(sequelize, DataTypes);
db.Admin = require('./Admin')(sequelize, DataTypes);
db.User = require('./User')(sequelize, DataTypes);
db.Role = require('./Role')(sequelize, DataTypes);
db.Module = require('./Module')(sequelize, DataTypes);
db.Permission = require('./Permission')(sequelize, DataTypes);
db.RoleModule = require('./RolePermission')(sequelize, DataTypes);
db.PermissionModule = require('./PermissionModule')(sequelize, DataTypes);

// Define associations
const Role = db.Role;
const Module = db.Module;
const Permission = db.Permission

// Define associations
Role.belongsToMany(Permission, { through: 'RolePermission' });
Permission.belongsToMany(Role, { through: 'RolePermission' });


Permission.belongsToMany(Module, { through: db.PermissionModule }); // Verify that Permission model is defined properly
Module.belongsToMany(Permission, { through: db.PermissionModule });

db.sequelize.sync();
console.log("All models were alter successfully.");
module.exports = db;
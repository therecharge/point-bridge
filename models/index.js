'use strict';

const fs = require('fs');
const path = require('path');
const Sequelize = require('sequelize');
const basename = path.basename(__filename);
const env = process.env.NODE_ENV || 'development';
const config = require(__dirname + '/../config/config.js')[env];
const db = {};
const DataTypes = require('sequelize'); 

let sequelize;
if (config.use_env_variable) {
  sequelize = new Sequelize(process.env[config.use_env_variable], config);
} else {
  sequelize = new Sequelize(config.database, config.username, config.password, config);
}

fs
  .readdirSync(__dirname)
  .filter(file => {
    return (file.indexOf('.') !== 0) && (file !== basename) && (file.slice(-3) === '.js');
  })
  .forEach(file => {
    const model = require(path.join(__dirname, file))(sequelize, Sequelize.DataTypes);
    db[model.name] = model;
  });

Object.keys(db).forEach(modelName => {
  if (db[modelName].associate) {
    db[modelName].associate(db);
  }
});

db.sequelize = sequelize;
db.Sequelize = Sequelize;
db.Point = sequelize.define("Point",{
  id: {
    type: DataTypes.TEXT,
    allowNull: false,
    unique: true,primaryKey: true
  },
  point: DataTypes.INTEGER
});
db.Sig_used = sequelize.define("Sig_used",{
  id: {
    type: DataTypes.TEXT,
    allowNull: false,
    unique: true,
    primaryKey: true
  },
  used: DataTypes.BOOLEAN
});
db.Tx_list = sequelize.define("Tx_list",{
  id: {
    type: DataTypes.TEXT,
    allowNull: false,
    unique: true,
    primaryKey: true
  },
  confirms: DataTypes.INTEGER
});

module.exports = db;

'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Tx_list extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  };
  Tx_list.init({
    id: {
      type: DataTypes.TEXT,
      allowNull: false,
      unique: true,
      primaryKey: true
    },
    confirms: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Tx_list',
  });
  return Tx_list;
};
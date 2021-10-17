'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Sig_used extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  };
  Sig_used.init({
    id: {
      type: DataTypes.TEXT,
      allowNull: false,
      unique: true,
      primaryKey: true
    },
    used: DataTypes.BOOLEAN
  }, {
    sequelize,
    modelName: 'Sig_used',
  });
  return Sig_used;
};
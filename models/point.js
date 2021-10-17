'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Point extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  };
  Point.init({
    id: {
      type: DataTypes.TEXT,
      allowNull: false,
      unique: true,
      primaryKey: true
    },
    point: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Point',
  });
  return Point;
};
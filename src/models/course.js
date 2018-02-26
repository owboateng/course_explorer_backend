'use strict';
module.exports = (sequelize, DataTypes) => {
  var Course = sequelize.define('Course', {
    code: {
      type:DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    name: DataTypes.STRING,
    creator_email: DataTypes.STRING,
    categories: DataTypes.STRING,
    status:DataTypes.STRING
  }, {});
  Course.associate = function(models) {
    Course.hasMany(models.Section);
  };
  return Course;
};
'use strict';
module.exports = (sequelize, DataTypes) => {
  var Section = sequelize.define('Section', {
    course_code: DataTypes.STRING,
    title: DataTypes.STRING,
    content: DataTypes.TEXT,
    position: DataTypes.INTEGER.UNSIGNED
  }, {});
  Section.associate = function(models) {
    // associations can be defined here
  };
  return Section;
};
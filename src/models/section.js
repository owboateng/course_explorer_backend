'use strict';
module.exports = (sequelize, DataTypes) => {
  var Section = sequelize.define('Section', {
    course_code: DataTypes.INTEGER,
    title: DataTypes.STRING,
    content: DataTypes.TEXT,
  }, {});
  Section.associate = function(models) {
    // associations can be defined here
  };
  return Section;
};
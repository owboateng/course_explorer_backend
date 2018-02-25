'use strict';
module.exports = (sequelize, DataTypes) => {
  var User = sequelize.define('User', {
    email: {
      type:DataTypes.STRING,
      primaryKey: true
    },
    first_name: DataTypes.STRING,
    last_name: DataTypes.STRING,
    role: DataTypes.STRING,
    link_profile_pix: DataTypes.STRING
  }, {});
  User.associate = function(models) {
    User.hasMany(models.Course);
  };
  return User;
};
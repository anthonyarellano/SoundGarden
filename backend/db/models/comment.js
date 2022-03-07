'use strict';
module.exports = (sequelize, DataTypes) => {
  const Comment = sequelize.define('Comment', {
    userId: DataTypes.INTEGER,
    songId: DataTypes.INTEGER,
    body: DataTypes.TEXT
  }, {});
  Comment.associate = function(models) {
    // associations can be defined here
  };
  return Comment;
};
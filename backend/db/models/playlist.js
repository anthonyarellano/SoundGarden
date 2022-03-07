'use strict';
module.exports = (sequelize, DataTypes) => {
  const Playlist = sequelize.define('Playlist', {
    title: DataTypes.STRING,
    userId: DataTypes.INTEGER
  }, {});
  Playlist.associate = function(models) {
    // associations can be defined here
  };
  return Playlist;
};
'use strict';
module.exports = (sequelize, DataTypes) => {
  const SongPlayListJoin = sequelize.define('SongPlayListJoin', {
    songId: DataTypes.INTEGER,
    playlistId: DataTypes.INTEGER
  }, {});
  SongPlayListJoin.associate = function(models) {
    // associations can be defined here
  };
  return SongPlayListJoin;
};
'use strict';
module.exports = (sequelize, DataTypes) => {
  const Playlist = sequelize.define('Playlist', {
    title: DataTypes.STRING,
    userId: DataTypes.INTEGER
  }, {});
  Playlist.associate = function(models) {
    Playlist.belongsTo(models.User, { foreignKey: 'userId' });
    const columnMapping = {
      through: 'SongPlaylistJoin',
      otherKey: 'songId',
      foreignKey: 'playlistId'
    };
    Playlist.belongsToMany(models.Song, columnMapping); 
  };
  return Playlist;
};

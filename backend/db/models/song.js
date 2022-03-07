'use strict';

module.exports = (sequelize, DataTypes) => {
  const Song = sequelize.define('Song', {
    userId: DataTypes.INTEGER,
    url: DataTypes.STRING,
    title: DataTypes.STRING,
    imgUrl: DataTypes.STRING
  }, {});
  Song.associate = function(models) {
    Song.belongsTo(models.User, { foreignKey: 'userId' });
    Song.hasMany(models.Comment, { foreignKey: 'songId' });
    const columnMapping = {
      through: 'SongPlaylistJoin',
      otherKey: 'playlistId',
      foreignKey: 'songId'
    };
    Song.belongsToMany(models.Playlist, columnMapping);
  };
  return Song;
};

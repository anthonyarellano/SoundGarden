const express = require('express')
const asyncHandler = require('express-async-handler');
const { User, Playlist, SongPlayListJoin, Song } = require('../../db/models');

const router = express.Router();

router.post(
    '/',
    asyncHandler(async (req, res) => {
        const { playlist } = req.body;
        const newPlaylist = await Playlist.create(playlist);

        if (newPlaylist) {
            return res.json(newPlaylist)
        }
    })
)

router.get(
    '/:userId',
    asyncHandler(async (req, res) => {
        const { userId } = req.params;
        const playlists = await Playlist.findAll({
            where: {
                userId,
            },
            include: {
                model: Song
            }
        });
        if (playlists) {
            console.log(playlists[0].Songs);
            res.json(playlists)
        }
    })
)

router.put(
    '/',
    asyncHandler(async (req, res) => {
        const { args } = req.body;
        const { songId, playlistId } = args;
        const join = await SongPlayListJoin.create({
            playlistId,
            songId
        });
        if (join) {
            res.json(join);
        }

    })
)

module.exports = router;

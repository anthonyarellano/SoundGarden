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

router.put(
    '/remove',
    asyncHandler(async (req, res) => {
        const { data } = req.body;
        const { songId, playlistId } = data;
        const join = await SongPlayListJoin.findOne({
            where: {
                songId,
                playlistId
            }
        });
        if (join) {
            await join.destroy();
            const updatedPlaylist = await Playlist.findByPk(playlistId, {
                include: {
                    model: Song
                }
            });
            if (updatedPlaylist) {
                res.json(updatedPlaylist)
            };
        };

    })
)

router.delete(
    '/',
    asyncHandler(async (req, res) => {
        const { playlistId } = req.body;
        await SongPlayListJoin.destroy({
            where :{
                playlistId
            }
        });
        await Playlist.destroy({
            where: {
                id: playlistId
            }
        });
        const ok = { "response": "Success" }
        res.json(ok)
    })
)
module.exports = router;

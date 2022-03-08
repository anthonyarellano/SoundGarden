const express = require('express')
const asyncHandler = require('express-async-handler');
const { User, Playlist } = require('../../db/models');

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
                userId
            }
        });
        if (playlists) {
            res.json(playlists)
        }
    })
)

module.exports = router;

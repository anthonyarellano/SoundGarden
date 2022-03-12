const express = require('express')
const asyncHandler = require('express-async-handler');
const { User, Song } = require('../../db/models');

const router = express.Router();

router.get(
    '/',
    asyncHandler(async (req, res) => {
        const artists = await User.findAll({
            include : {
                model: Song
            }
        });

        if (artists) {
        const realArtists = [];
        artists.forEach((artist) => {
            if (artist.Songs.length > 0) {
                realArtists.push(artist);
            }
        })
            res.json({realArtists});
        }
    })
)







module.exports = router;

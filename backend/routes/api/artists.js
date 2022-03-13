const express = require('express')
const asyncHandler = require('express-async-handler');
const { User, Song, Sequelize } = require('../../db/models');

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

router.get(
    '/:term',
    asyncHandler(async (req, res) => {
        const { term } = req.params
        const urlTerm = term.replace(/\-/g, " ");

        const Op = Sequelize.Op
        const artists = await User.findAll({
            where: {
                username: {
                    [Op.iLike] : `%${urlTerm}%`
                }
            }
        })
        if (artists) {
            return res.json({ artists });
        }
    })
)






module.exports = router;

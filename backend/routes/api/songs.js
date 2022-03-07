const express = require('express')
const asyncHandler = require('express-async-handler');
const { User, Song } = require('../../db/models');

const router = express.Router();

router.get(
    '/:userId',
    asyncHandler(async (req, res) => {
        const { userId } = req.params;
        const user = await User.findByPk(userId, {
            include: Song
        });

        if (user) {
            return res.json({ user })
        }
    })
);

router.post(
    '/',
    asyncHandler(async (req, res) => {
        const { song } = req.body;
        const { userId, title, url, imgUrl } = song;
        console.log(userId, title, url, imgUrl);
        const createdSong = await Song.create({
            userId,
            title,
            url,
            imgUrl
        });
        if (createdSong) {
            return res.json({ createdSong });
        }
    })
)

router.put(
    '/',
    asyncHandler(async (req, res) => {
        const { song } = req.body;
        const { id, userId, title, url, imgUrl } = song;
        const dbSong = await Song.findByPk(id);

        if (dbSong) {
            await dbSong.update({ title: title });
            return res.json({ dbSong });
        }
    })
)







module.exports = router;

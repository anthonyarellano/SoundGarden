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










module.exports = router;

const router = require('express').Router();
const asyncHandler = require('express-async-handler');
// const { setTokenCookie, restoreUser, requireAuth } = require('../../utils/auth.js');
const { User } = require('../../db/models');
const sessionRouter = require('./session.js');
const usersRouter = require('./users.js');
const songsRouter = require('./songs.js')
const playlistsRouter = require('./playlists.js');

router.use('/session', sessionRouter);
router.use('/users', usersRouter);
router.use('/songs', songsRouter)
router.use('/playlists', playlistsRouter)

router.post('/test', (req, res) => {
  res.json({ requestBody: req.body });
});

module.exports = router;

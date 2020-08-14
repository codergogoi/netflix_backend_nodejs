const express = require('express');
const router = express.Router();
const auth = require('../middleware/authCheck');
const sourceAuth = require('../middleware/sourceCheck');

const videoController = require('../controllers/videoController');

router.use((req, res, next) => {
  // console.log(req);
  next();
});
// router.get('/movie/:id', auth, videoController.getWatchVideo);

router.get('/movie/:id', videoController.getWatchVideo);

router.get('/episodes/:id', auth, videoController.viewEpisodes);

router.use('/', videoController.topVideos);

module.exports = router;

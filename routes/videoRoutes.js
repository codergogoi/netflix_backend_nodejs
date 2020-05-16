const express = require("express");
const router = express.Router();
const auth = require("../middleware/authCheck");

const videoController = require("../controllers/videoController");

router.get("/movie/:id", auth, videoController.getWatchVideo);

router.get("/episodes/:id", auth, videoController.viewEpisodes);

router.use("/", auth, videoController.topVideos);

module.exports = router;

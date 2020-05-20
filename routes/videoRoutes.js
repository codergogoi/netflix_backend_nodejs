const express = require("express");
const router = express.Router();
const auth = require("../middleware/authCheck");
const sourceAuth = require("../middleware/sourceCheck");

const videoController = require("../controllers/videoController");

router.get("/movie/:id/:auth", sourceAuth, auth, videoController.getWatchVideo);

router.get("/episodes/:id", auth, videoController.viewEpisodes);

router.use("/", auth, videoController.topVideos);

module.exports = router;

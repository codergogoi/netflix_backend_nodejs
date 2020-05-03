const express = require("express");
const router = express.Router();
const auth = require("../middleware/authCheck");
const sourceCheck = require("../middleware/sourceCheck");

const videoController = require("../controllers/videoController");

//router.get("/movie", sourceCheck, auth, videoController.getWatchVideo);

router.get("/movie/:id", videoController.getWatchVideo);

router.use("/", videoController.topVideos);

module.exports = router;

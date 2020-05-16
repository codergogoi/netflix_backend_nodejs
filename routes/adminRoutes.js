const express = require("express");
const router = express.Router();

const adminController = require("../controllers/adminController");

router.post("/login");
router.post("/new-movie", adminController.newMovie);
router.post("/new-plan", adminController.newPlan);
router.post("/new-episode/:id", adminController.newEpisode);

module.exports = router;

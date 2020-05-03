const express = require("express");
const router = express.Router();

const adminController = require("../controllers/adminController");

router.post("/new-movie", adminController.newMovie);

module.exports = router;

const router = require("express").Router();

const userController = require("../controllers/userController");

router.use("/login", userController.login);

module.exports = router;

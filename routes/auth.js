const router = require("express").Router();
const controller = require("../controllers/authController");

//REGISTER
router.post("/register", controller.CreateUser);

//LOGIN
router.post("/login", controller.Login);

module.exports = router;

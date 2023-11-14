const router = require("express").Router();
const controller = require("../controllers/userController");

//UPDATE
router.put("/:id", controller.UpdateUser);

//DELETE
router.delete("/:id", controller.DeleteUser);

//GET ALL USER
router.get("/", controller.GetAllUsers);

//GET USER STATS
router.get("/stats", controller.GetStats);

module.exports = router;

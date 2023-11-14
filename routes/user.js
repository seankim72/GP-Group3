const router = require("express").Router();
const controller = require("../controllers/userController");

//UPDATE
router.put("/:id", controller.UpdateUser);

//DELETE
router.delete("/:id", controller.DeleteUser);

// Get single user
router.get("/:id", controller.GetUser);

//GET ALL USER
router.get("/", controller.GetAllUsers);

//GET USER STATS
router.get("/stats", controller.GetStats);

module.exports = router;

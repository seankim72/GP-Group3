const controller = require("../controllers/musicController");

const router = require("express").Router();

//CREATE
router.post("/", controller.CreateNewMusic);

//UPDATE
router.put("/:id", controller.UpdateMusic);

//DELETE
router.delete("/:id", controller.DeleteMusic);

//GET Music
router.get("/:id", controller.GetMusic);

//GET ALL MusicS
router.get("/", controller.GetAllMusic);

module.exports = router;

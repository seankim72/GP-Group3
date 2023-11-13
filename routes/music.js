const Music = require("../models/Music");
const {
  verifyTokenAndAdmin,
} = require("./verifyToken");

const router = require("express").Router();

//CREATE

router.post("/", verifyTokenAndAdmin, async (req, res) => {
    const newMusic = new Music(req.body);
  
    try {
      const savedMusic = await newMusic.save();
      res.status(200).json(savedMusic);
    } catch (err) {
      res.status(500).json(err);
    }
  });
  
  //UPDATE
  router.put("/:id", verifyTokenAndAdmin, async (req, res) => {
    try {
      const updatedMusic = await Music.findByIdAndUpdate(
        req.params.id,
        {
          $set: req.body,
        },
        { new: true }
      );
      res.status(200).json(updatedMusic);
    } catch (err) {
      res.status(500).json(err);
    }
  });
  
  //DELETE
  router.delete("/:id", verifyTokenAndAdmin, async (req, res) => {
    try {
      await Music.findByIdAndDelete(req.params.id);
      res.status(200).json("Music has been deleted...");
    } catch (err) {
      res.status(500).json(err);
    }
  });
  
  //GET Music
  router.get("/:id", async (req, res) => {
    try {
      const Music = await Music.findById(req.params.id);
      res.status(200).json(Music);
    } catch (err) {
      res.status(500).json(err);
    }
  });
  
  //GET ALL MusicS
  router.get("/", async (req, res) => {
    const qNew = req.query.new;
    const qCategory = req.query.category;
    try {
      let Musics;
  
      if (qNew) {
        Musics = await Music.find().sort({ createdAt: -1 }).limit(1);
      } else if (qCategory) {
        Musics = await Music.find({
          categories: {
            $in: [qCategory],
          },
        });
      } else {
        Musics = await Music.find();
      }
  
      res.status(200).json(Musics);
    } catch (err) {
      res.status(500).json(err);
    }
  });
  

module.exports = router;
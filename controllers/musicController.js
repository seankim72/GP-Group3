const Music = require("../models/Music");
const {
  verifyTokenAndAuthorization,
  verifyTokenAndAdmin,
} = require("../verifyToken");

// Create
async function CreateNewMusic(req, res) {
  verifyTokenAndAdmin(req, res, async () => {
    const newMusic = new Music(req.body);

    try {
      const savedMusic = await newMusic.save();
      res.status(200).json(savedMusic);
    } catch (err) {
      res.status(500).json(err);
    }
  });
}

// update
async function UpdateMusic(req, res) {
  verifyTokenAndAdmin(req, res, async () => {
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
}

// Delete
async function DeleteMusic(req, res) {
  verifyTokenAndAdmin(req, res, async () => {
    try {
      await Music.findByIdAndDelete(req.params.id);
      res.status(200).json("Music has been deleted...");
    } catch (err) {
      res.status(500).json(err);
    }
  });
}

// Get
async function GetMusic(req, res) {
  verifyTokenAndAdmin(req, res, async () => {
    try {
      const music = await Music.findById(req.params.id);
      res.status(200).json(music);
    } catch (err) {
      res.status(500).json(err);
    }
  });
}

// Get all
async function GetAllMusic(req, res) {
  verifyTokenAndAdmin(req, res, async () => {
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
}
module.exports = {
  CreateNewMusic,
  UpdateMusic,
  DeleteMusic,
  GetMusic,
  GetAllMusic,
};

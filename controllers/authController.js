const User = require("../models/User");
const jwt = require("jsonwebtoken");

// eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9eyJpZCI6IjY1NTM4OTVmNDI4NDIzZjliM2IwNzM0ZiIsImlzQWRtaW4iOmZhbHNlLCJpYXQiOjE2OTk5NzM1NzMsImV4cCI6MTcwMDIzMjc3M30.JC3xvsF4-n0UuP4zRhhTpr9mcrXYUsAONhIGYPbVGBs

// Create
async function CreateUser(req, res) {
  const newUser = new User({
    username: req.body.username,
    email: req.body.email,
    password: req.body.password,
  });

  try {
    const savedUser = await newUser.save();
    res.status(201).json(savedUser);
  } catch (err) {
    res.status(500).json(err);
  }
}

// Login
async function Login(req, res) {
  try {
    const user = await User.findOne({ username: req.body.username });
    if (!user) {
      res.status(401).json("Username not found");
      return;
    }
    const hashedPassword = user.password;

    if (hashedPassword !== req.body.password) {
      res.status(401).json("Wrong password!");
      return;
    }

    const accessToken = jwt.sign(
      {
        id: user._id,
        isAdmin: user.isAdmin,
      },
      process.env.JWT_SEC,
      { expiresIn: "3d" }
    );

    const { password, ...others } = user._doc;
    res.status(200).json({ ...others, accessToken });
  } catch (err) {
    res.status(500).json(err);
  }
}

module.exports = {
  CreateUser,
  Login,
};

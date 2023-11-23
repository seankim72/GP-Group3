const express = require("express");
const app = express();
const cors = require("cors");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const userRoute = require("./routes/user");
const authRoute = require("./routes/auth");
const musicRoute = require("./routes/music");

dotenv.config();

mongoose
  .connect(process.env.MONGO_URL)
  .then(() => console.log("Database connected!"))
  .catch((err) => {
    console.log(err);
  });

app.use(express.json());
app.use(cors({ origin: "http://localhost:3000" }));
app.use("/api/auth", authRoute);
app.use("/api/user", userRoute);
app.use("/api/music", musicRoute);

app.get("/", (req, res) => {
  res.json({ message: "Welcome to DynamoVinyls." });
});

app.listen(8080, () => {
  console.log("Backend server is running!");
});

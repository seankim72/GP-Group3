const express = require("express");
const app = express();
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const userRoute = require("./routes/user");
const authRoute = require("./routes/auth");
const musicRoute = require("./routes/music");
 
// dotenv.config();

const dbConfig = require("./config/db.config");
mongoose
    .connect(dbConfig.url)
    .then(()=>console.log("Database connected!"))
    .catch((err) =>{
        console.log(err);
    });

app.use(express.json());
app.use("/api/auth",authRoute);
app.use("/api/user",userRoute);
app.use("/api/music",musicRoute);

app.get("/", (req, res) => {
    res.json({ message: "Welcome to DynamoVinyls." });
  });

app.listen(8080,()=>{
    console.log("Backend server is running!");
});
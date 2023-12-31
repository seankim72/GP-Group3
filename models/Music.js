const mongoose = require("mongoose");

const MusicSchema = new mongoose.Schema(
    {
        title:{ type: String, required:true, unique:true},
        singer:{ type: String, required:true },
        img:{ type: String, required:true },
        categories: { type: Array },
        price:{type: Number, required: true }
    },
    {timestamps: true}
);

module.exports = mongoose.model("Music",MusicSchema);
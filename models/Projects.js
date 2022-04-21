const mongoose = require("mongoose");

const ProjetSchema = new mongoose.Schema({
  name: String,
  color: {
    R: String,
    G: String,
    B: String,
    A: {type:String, default:"1"}
  },
});

const ProjetModel = mongoose.model("Project", ProjetSchema);

module.exports = ProjetModel;
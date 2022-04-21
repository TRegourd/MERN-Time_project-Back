const mongoose = require("mongoose");

const ProjetSchema = new mongoose.Schema({
  name: String,
  color: {
    r: String,
    g: String,
    b: String,
    a: {type:String, default:"1"}
  },
});

const ProjetModel = mongoose.model("Project", ProjetSchema);

module.exports = ProjetModel;
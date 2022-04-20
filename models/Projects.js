const mongoose = require("mongoose");

const ProjetSchema = new mongoose.Schema({
  name: String,
  color: String,
});

const ProjetModel = mongoose.model("Project", ProjetSchema);

module.exports = ProjetModel;
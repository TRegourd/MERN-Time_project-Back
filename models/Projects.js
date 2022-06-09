const mongoose = require("mongoose");

const ProjetSchema = new mongoose.Schema({
  name: String,
  user: {
    type: mongoose.Types.ObjectId,
    ref: "User",
  },
  customer: String,
});

const ProjetModel = mongoose.model("Project", ProjetSchema);

module.exports = ProjetModel;

const mongoose = require("mongoose");

const TeamSchema = new mongoose.Schema(
  {
    name: {
      type: String,
    },
    code: {
      type: String,
    },
    user: {
      type: mongoose.Types.ObjectId,
      ref: "User",
    },
  },
  { timestamps: true }
);

const TeamModel = mongoose.model("Team", TeamSchema);

module.exports = TeamModel;

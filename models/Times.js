const mongoose = require("mongoose");

const TimeSchema = new mongoose.Schema(
  {
    desc: {
      type: String,
    },
    date: {
      type: Date,
    },
    duration: {
      type: Number,
    },
    start: {
      type: Date,
    },
    end: {
      type: Date,
    },
    project: {
      type: mongoose.Types.ObjectId,
      ref: "Project",
    },
    user: {
      type: mongoose.Types.ObjectId,
      ref: "User",
    },
  },
  { timestamps: true }
);

const Time = mongoose.model("Times", TimeSchema);

module.exports = Time;
